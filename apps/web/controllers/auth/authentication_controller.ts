import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  public async showSignIn({ view }: HttpContextContract) {
    return view.render('web::views/authentication/login')
  }

  public async showSignUp({ view }: HttpContextContract) {
    return view.render('web::views/authentication/store')
  }

  public async login({ request, response, session, auth, view }: HttpContextContract) {
    console.log('test')
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
}
