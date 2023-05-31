import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/User'
import twoFactor from 'node-2fa'

export default class AuthenticationController {
  public async twoFactorChallenge({ request, session, auth, response }: HttpContextContract) {
    const { code, recoveryCode } = request.only(['code', 'recoveryCode'])
    const user = await User.query().where('id', session.get('login.id')).first()

    if (!user) {
      return
    }
    if (code) {
      const isValid = await twoFactor.verifyToken(user!.twoFactorSecret!, code)
      if (isValid) {
        await auth.login(user)
        return response.redirect('/')
      }
    } else if (recoveryCode) {
      const codes = user?.twoFactorRecoveryCodes ?? []
      if (codes.includes(recoveryCode)) {
        user!.twoFactorRecoveryCodes = codes.filter((c) => c !== recoveryCode)
        await user.save()
        await auth.login(user)
        return response.redirect('/')
      }
    }
  }
}
