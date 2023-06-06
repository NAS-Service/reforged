import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'Domains/users/models/role'

export default class RolesController {
  public async index({ view }: HttpContextContract) {
    const roles = await Role.query().preload('permissions').preload('users').first()

    return view.render('manager::view/roles/index', { roles })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('manager::view/roles/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.body()

    const role = await Role.create(data)
    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }
    return response.redirect().toRoute('')
  }

  public async show({ view, params }: HttpContextContract) {
    const role = Role.query().where('id', params.id).preload('permissions').preload('users').first()
    return view.render('manager::view/roles/show', { role })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.redirect().toRoute('')
  }
}
