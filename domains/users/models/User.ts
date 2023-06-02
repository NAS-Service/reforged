import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Token from 'Domains/users/models/token'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public username: string

  @column()
  public avatarUrl: string

  @column({ serializeAs: null })
  public oauthProviderId: string

  @column({ serializeAs: null })
  public oauthProviderName: string

  @column()
  public hasEmailVerified: boolean

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? JSON.parse(Encryption.decrypt(value) ?? '{}') : null),
    prepare: (value: string) => Encryption.encrypt(JSON.stringify(value)),
  })
  public twoFactorSecret?: string

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? JSON.parse(Encryption.decrypt(value) ?? '[]') : []),
    prepare: (value: string[]) => Encryption.encrypt(JSON.stringify(value)),
  })
  public twoFactorRecoveryCodes?: string[]

  @column()
  public isTwoFactorEnabled: boolean

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'PASSWORD_RESET'),
  })
  public passwordResetTokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'VERIFY_EMAIL'),
  })
  public verifyEmailTokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
