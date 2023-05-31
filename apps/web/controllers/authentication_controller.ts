import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  public async showSignIn({ view }: HttpContextContract) {
    return view.render('manager::views/welcome')
  }

  public async showSignUp({ view }: HttpContextContract) {
    return view.render('web::views/authentication/store')
  }

  public async login({ request, response, auth, view }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const user = await auth.use('web').verifyCredentials(email, password)

    if (user.isTwoFactorEnabled) {
      return view.render('')
    }

    await auth.login(user)
    response.redirect().toRoute('aa')
  }
}
