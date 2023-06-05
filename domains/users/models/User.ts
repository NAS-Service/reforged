import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Token from 'Domains/users/models/token'
import Role from 'Domains/users/models/role'
import Permission, { PermissionKey } from 'Domains/users/models/permission'
import { RequestContract } from '@ioc:Adonis/Core/Request'

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

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static async syncRoles(user: User, request: RequestContract): Promise<void> {
    const roles = request.input('roles', [])
    if (roles) {
      await user.related('roles').sync(Array.isArray(roles) ? [...roles] : [roles])
    }
  }

  public static async hasRole(user: User, ...permissions: PermissionKey[]): Promise<boolean> {
    await user.load('roles', (query) => query.preload('permissions'))

    const permissionKeys = user.roles.flatMap((role: Role) => {
      return role.permissions.map((permission: Permission) => permission.key)
    })

    return permissions.some((permission) => {
      return permissionKeys.includes(permission)
    })
  }

  public static async getHighRole(user: User): Promise<Role | undefined> {
    await user.load('roles')

    if (!user.roles.length) {
      return
    }

    return user.roles.reduce((accumulator: Role, role: Role) => {
      if (role.power > accumulator.power) {
        accumulator = role
      }

      return accumulator
    })
  }
}
