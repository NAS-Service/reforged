import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
import User from 'Domains/users/models/User'

type TokenType = 'PASSWORD_RESET' | 'VERIFY_EMAIL'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string | null

  @column()
  public type: TokenType

  @column()
  public token: string

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static async getUserToken(token: string, type: TokenType) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('type', type)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first()

    return record?.user
  }

  public static async expireTokens(
    user: User,
    relationName: 'passwordResetTokens' | 'verifyEmailTokens'
  ) {
    await user.related(relationName).query().update({
      expiresAt: DateTime.now(),
    })
  }

  public static async generatePasswordResetToken(user: User | null) {
    const token: string = string.generateRandom(64)

    if (!user) {
      return
    }

    const record: Token = await user.related('tokens').create({
      type: 'PASSWORD_RESET',
      expiresAt: DateTime.now().plus({ hour: 1 }),
      token,
    })

    return record.token
  }

  public static async generateVerifyEmailToken(user: User) {
    const token = string.generateRandom(64)

    await Token.expireTokens(user, 'verifyEmailTokens')
    const record = await user.related('tokens').create({
      type: 'VERIFY_EMAIL',
      expiresAt: DateTime.now().plus({ hour: 24 }),
      token,
    })

    return record.token
  }

  public static async expirePasswordResetTokens(user: User) {
    await user.related('passwordResetTokens').query().update({
      expiresAt: DateTime.now(),
    })
  }

  public static async getPasswordResetUser(token: string): Promise<User | undefined> {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first()

    return record?.user
  }

  public static async verify(token: string): Promise<boolean> {
    const record = await Token.query()
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .first()

    return !!record
  }
}
