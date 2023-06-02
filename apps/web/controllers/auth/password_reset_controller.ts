import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { rules } from '@adonisjs/validator/build/src/Rules'
import User from 'Domains/users/models/User'
import Token from 'Domains/users/models/token'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class PasswordResetController {
  public async forgot({ view }: HttpContextContract): Promise<string> {
    return view.render('web::views/authentication/password/forgot')
  }
  public async send({ request, response }: HttpContextContract) {
    const { email } = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email()]),
      }),
    })

    const user = await User.findBy('email', email)
    const token = await Token.generatePasswordResetToken(user)
    const resetLink = Route.makeUrl('password.reset', [token])

    await Mail.send((message) => {
      message
        .from('noreply@gmail.com')
        .to(email)
        .subject('Reset Password')
        .htmlView('web::views/mails/reset_password', { url: resetLink })
    })

    return response.redirect().back()
  }

  public async reset({ view, params }: HttpContextContract) {
    const isValid = await Token.verify(params.token)

    return view.render('web::views/authentication/password/reset', { isValid, token: params.token })
  }

  public async store({ request, response, auth }: HttpContextContract): Promise<void> {
    const { token, password } = await request.validate({
      schema: schema.create({
        token: schema.string({ trim: true }),
        password: schema.string({ trim: true }, [rules.minLength(8)]),
      }),
    })

    const user = await Token.getPasswordResetUser(token)

    if (!user) {
      return response.redirect().back()
    }

    await user.merge({ password }).save()
    await auth.login(user)

    return response.redirect().toPath('/')
  }
}
