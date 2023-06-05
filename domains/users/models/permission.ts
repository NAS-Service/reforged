import { column } from '@ioc:Adonis/Lucid/Orm'

export enum PermissionKey {
  viewUser = 'ViewUser',
}

export default class Permission {
  @column({ isPrimary: true })
  public id: string

  @column()
  public key: PermissionKey

  @column()
  public name: string

  @column()
  public description: string | null
}
