import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  public async showLogin({ view }: HttpContextContract) {
    return view.render('manager::views/welcome')
  }
}
