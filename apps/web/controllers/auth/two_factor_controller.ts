import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import User from 'Domains/users/models/User'

export default class TwoFactorController {
  public async index({ view, auth }: HttpContextContract) {
    const user = await User.find(auth.user!.id)

    const secret = speakeasy.generateSecret({ length: 20 })
    const sharedSecret = secret.base32

    user!.twoFactorSecret = sharedSecret
    await user!.save()

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: sharedSecret,
      label: 'Reforged',
      issuer: 'Nas-Service',
    })

    const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl)

    return view.render('web::views/authentication/2fa', { qrCodeUrl })
  }


}
