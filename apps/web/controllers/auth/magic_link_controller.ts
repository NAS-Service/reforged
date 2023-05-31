import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class MagicLinkController {
  public async index({ view }: HttpContextContract) {
    return view.render('web::views/authentication/magic_link')
  }

  public async sendMagicLink({ request }: HttpContextContract) {
    const email = request.input('email')

    const magicLink = Route.makeSignedUrl(
      'magic_link.verify',
      {
        email: email,
      },
      {
        expiresIn: '15m',
      }
    )

    console.log(magicLink)
  }
}
