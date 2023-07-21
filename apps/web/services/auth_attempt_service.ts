import AuthAttempt from 'Domains/users/models/auth_attempt'
import { DateTime } from 'luxon'
import { AuthAttemptPurposes } from 'apps/web/enums/auth_attempt_purposes'

export default class AuthAttemptService {
  public static allowedAttempts = 3

  public static async getAttemptsCount(uid: string): Promise<number> {
    const attempts = (
      await AuthAttempt.query().where('uid', uid).whereNull('deletedAt').count('id').firstOrFail()
    ).$extras.count

    return attempts
  }

  public static async getRemainingAttempts(uid: string): Promise<number> {
    const attempts = await this.getAttemptsCount(uid)
    return this.allowedAttempts - attempts
  }

  public static async hasRemainingAttempts(uid: string): Promise<boolean> {
    const remainingAttempts = await this.getRemainingAttempts(uid)
    return remainingAttempts > 0
  }

  public static async deleteBadAttempts(uid: string): Promise<void> {
    await AuthAttempt.query()
      .where('uid', uid)
      .whereNull('deletedAt')
      .update({ deletedAt: DateTime.now().toSQL() })
  }

  public static async recordLoginAttempt(uid: string): Promise<void> {
    await AuthAttempt.create({
      uid,
      purposeId: AuthAttemptPurposes.LOGIN,
    })
  }

  public static async recordChangeEmailAttempt(email: string): Promise<void> {
    await AuthAttempt.create({
      uid: email,
      purposeId: AuthAttemptPurposes.CHANGE_EMAIL,
    })
  }
}
