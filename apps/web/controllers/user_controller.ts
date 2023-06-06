import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/User'
import UserValidator from 'apps/web/validators/user_validator'
import Token from 'Domains/users/models/token'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UserController {
  public async create({ view }: HttpContextContract) {
    return view.render('web::views/authentication/create_user')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    const user = await User.create({
      username: data.firstname,
      email: data.email,
      oauthProviderName: 'web',
      password: data.password,
    })

    const token = await Token.generateVerifyEmailToken(user)
    const activeEmailLink = Route.makeUrl('email.verify', [token])

    await Mail.send((message) => {
      message
        .from('norerply@reforged.fr')
        .to(user.email)
        .subject('Verif Email')
        .htmlView('web::views/mails/verify', { url: activeEmailLink })
    })
    return response.redirect().toRoute('home')
  }
}
