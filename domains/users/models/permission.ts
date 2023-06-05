import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export enum PermissionKey {
  viewUser = 'viewUser',
}

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public key: PermissionKey

  @column()
  public name: string

  @column()
  public description: string | null
}
