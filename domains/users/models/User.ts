import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Token from 'Domains/users/models/token'
import Role from 'Domains/users/models/role'
import Permission from 'Domains/users/models/permission'

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

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>
}
