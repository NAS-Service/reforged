import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationValidator from 'apps/web/validators/auth/authentication_validator'
import User from 'Domains/users/models/User'

export default class AuthenticationController {
  public async index({ view }: HttpContextContract) {
    return view.render('web::views/authentication/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = await request.validate(AuthenticationValidator)
    const verifyUser = await User.findBy('email', email)

    if (!verifyUser) {
      session.flash('message', 'The user does not exist')
      return response.redirect().back()
    }

    if (verifyUser.oauthProviderName !== 'web') {
      session.flash('message', 'troll')
      return response.redirect().back()
    }

    if (verifyUser.isTwoFactorEnabled) {
      session.put('user_id', verifyUser.id)
      return response.redirect().toRoute('2fa')
    }

    const user = await auth.use('web').verifyCredentials(email, password)
    await auth.login(user)

    return response.redirect().toRoute('home')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('showLogin')
  }
}
