import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/User'
import UserValidator from 'apps/web/validators/user_validator'

export default class UserController {
  public async create({ view }: HttpContextContract) {
    return view.render('web::views/authentication/create_user')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    await User.create({
      username: data.firstname,
      email: data.email,
      oauthProviderName: 'web',
      password: data.password,
    })

    return response.redirect().toRoute('aa')
  }
}
