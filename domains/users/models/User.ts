import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DateTime } from 'luxon'
import { computed } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public roleId: number

  @column()
  @slugify({ strategy: 'dbIncrement', fields: ['username'] })
  public username: string

  @column()
  public rememberMeToken: string | null

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatarUrl: string

  @column()
  public providerId: string

  @column()
  public providerEmail: string

  @column()
  public providerAccessToken: string

  @column()
  public emailVerified: string | null

  @column.dateTime()
  public emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get avatar() {
    if (this.avatarUrl) {
      if (this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl
      }

      return `/img/${this.avatarUrl}`
    }

    return gravatar.url(this.email, { s: '40' })
  }
}
