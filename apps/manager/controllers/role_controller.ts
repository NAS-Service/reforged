import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'Domains/users/models/role'
import { StoreValidator } from 'apps/manager/validators/role_validator'

export default class RolesController {
  public async index({ view }: HttpContextContract) {
    const roles = await Role.query().preload('permissions').preload('users').first()

    return view.render('manager::views/roles/index', { roles })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('manager::views/roles/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const role = await Role.create(data)
    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }
    return response.redirect().toRoute('manager.roles.index')
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
