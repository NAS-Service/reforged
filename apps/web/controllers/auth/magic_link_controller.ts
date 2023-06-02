import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'Domains/users/models/User'

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

    const url = `http://localhost:3333${magicLink}`

    await Mail.send((message) => {
      message
        .from('noreply@reforged.fr')
        .to(email)
        .subject('Magic Link Login')
        .htmlView('web::views/mails/magic_link', { url })
    })
  }

  public async verifyMagicLink({ request, params, response, auth, session }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findBy('email', params.email)
      await auth.login(user!)

      session.flash('message', 'Connected')
      return response.redirect().toRoute('aa')
    }

    session.flash('message', 'Signature is missing or URL was tampered.')
    return response.redirect().toRoute('magic_link')
  }
}
