import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/User'
import twoFactor from 'node-2fa'

export default class AuthenticationController {
  public async showSignIn({ view }: HttpContextContract) {
    return view.render('manager::views/welcome')
  }

  public async showSignUp({ view }: HttpContextContract) {
    return view.render('web::views/authentication/store')
  }

  public async login({ request, response, session, auth, view }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const user = await auth.use('web').verifyCredentials(email, password)

    if (user.isTwoFactorEnabled) {
      session.put('login.id', user.id)
      return view.render('')
    }

    session.forget('login.id')
    session.regenerate()
    await auth.login(user)
    response.redirect().toRoute('aa')
  }

  public async twoFactorChallenge({ request, session, auth, response }) {
    const { code, recoveryCode } = request.only(['code', 'recoveryCode'])
    const user = await User.query().where('id', session.get('login.id')).first()
    if (code) {
      const isValid = await twoFactor.verifyToken(user!.twoFactorSecret!, code)
      if (isValid) {
        await auth.login(user)
        return response.redirect('/')
      }
    } else if (recoveryCode) {
      const codes = user?.twoFactorRecoveryCodes ?? []
      if (codes.includes(recoveryCode)) {
        user!.twoFactorRecoveryCodes = codes.filter((c) => c !== recoveryCode)
        await user!.save()
        await auth.login(user)
        return response.redirect('/')
      }
    }
  }
}
