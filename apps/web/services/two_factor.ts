import Config from '@ioc:Adonis/Core/Config'
import User from 'Domains/users/models/User'
import twoFactor from 'node-2fa'
import * as crypto from 'crypto'
import QRCode from 'qrcode'

export default class TwoFactorAuthProvider {
  private issuer = Config.get('twoFactorAuthConfig.app.name') || 'adonisjs-2fa'

  public generateSecret(user: User) {
    const secret = twoFactor.generateSecret({
      name: this.issuer,
      account: user.email,
    })

    return secret.secret
  }

  public async generateRecoveryCodes() {
    const recoveryCodeLimit: number = 8
    const codes: string[] = []
    for (let i = 0; i < recoveryCodeLimit; i++) {
      const recoveryCode: string = `${await this.secureRandomString()}-${await this.secureRandomString()}`
      codes.push(recoveryCode)
    }
    return codes
  }

  public async secureRandomString() {
    return crypto.randomBytes(64).toString('hex')
  }

  public async generateQrCode(user: User) {
    const appName = encodeURIComponent(this.issuer)
    const userName = encodeURIComponent(user.email)
    const query = `?secret=${user.twoFactorSecret}&issuer=${appName}`
    const url = `otpauth://totp/${appName}${userName}${query}`
    const svg = await QRCode.toDataURL(url)
    return { svg, url }
  }
}
