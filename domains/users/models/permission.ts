import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'Domains/users/models/User'
import Role from 'Domains/users/models/role'
import { DateTime } from 'luxon'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public key: string

  @column()
  public label: string

  @column()
  public description: string | null

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
