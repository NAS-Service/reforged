import { BasePolicy } from '@adonisjs/bouncer/build/src/BasePolicy'
import User from 'Domains/users/models/User'

export default class HelperPolicy extends BasePolicy {
  public async before(user: User | null) {
    // TODO: Fix this
    // if (user) {
    //   const permissions = await HelperPolicy.getPermissions(user)
    //
    //   if (permissions.includes('administrateur')) return true
    // }
  }

  public static async getPermissions(user: User) {
    // await user.load('permissions')
    // await user.load('roles', (query) => query.preload('permissions'))
    //
    // const permissions: string[] = user.permissions.map((permission) => permission.key)
    //
    // user.roles.forEach((role) => {
    //   role.permissions.forEach((permission) => {
    //     if (!permissions.includes(permission.key)) permissions.push(permission.key)
    //   })
    // })
    // return permissions
    // TODO: Fix this
  }

  public static async getMaxRole(user: User) {
    // await user.load('roles')
    //
    // const max: number = Math.max(...user.roles.map((role) => role.power))
    //
    // return user.roles.find((role) => role.power === max)!
    // TODO: Fix this
  }
}
