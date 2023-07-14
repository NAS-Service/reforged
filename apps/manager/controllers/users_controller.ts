import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'Domains/users/models/role'
import User from 'Domains/users/models/User'

export default class UsersController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const search = request.input('search')
    const roleId = request.input('role')
    const users = await User.query()
      .if(search, (query) => query
        .where('username', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
      )
      .if(roleId, (query) => {
        return query.whereHas('roles', (query) => {
          return query.where('roles.id', roleId)
        })
      })
      .preload('permissions')
      .preload('roles', (query) => query.orderBy('power', 'desc'))
      .paginate(page, limit)

    return view.render('manager::views/users/index', {
      roles: await Role.all(),
      users: users.toJSON(),
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const role = Role.query().where('id', params.id).preload('permissions').preload('users').first()
    return view.render('manager::views/roles/show', { role })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.redirect().toRoute('manager.roles.index')
  }
}
