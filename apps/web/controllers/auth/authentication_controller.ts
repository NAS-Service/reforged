import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationValidator from 'apps/web/validators/auth/authentication_validator'

export default class AuthenticationController {
  public async showSignIn({ view }: HttpContextContract) {
    return view.render('web::views/authentication/login')
  }

  public async login({ request, response, session, auth, view }: HttpContextContract) {
    const { email, password } = await request.validate(AuthenticationValidator)
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
}
