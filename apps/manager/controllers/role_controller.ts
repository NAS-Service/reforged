import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'Domains/users/models/role'
import { StoreValidator } from 'apps/manager/validators/role_validator'

export default class RolesController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const search = request.input('search')
    const roles = await Role.query()
      .if(search, (query) => query.where('label', 'like', `%${search}%`))
      .preload('permissions')
      .preload('users')
      .paginate(page, limit)

    return view.render('manager::views/users/roles/index', { roles: roles.toJSON() })
  }

  public async show({ view, params }: HttpContextContract) {
    const role = Role.query().where('id', params.id).preload('permissions').preload('users').first()
    return view.render('manager::views/users/roles/show', { role })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('manager::views/users/roles/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const role = await Role.create(data)
    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }
    return response.redirect().toRoute('manager.roles.index')
  }

  public async destroy({ response, params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.redirect().toRoute('manager.roles.index')
  }
}
