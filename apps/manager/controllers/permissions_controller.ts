import Permission from 'Domains/users/models/permission'

export default class PermissionsController {
  public async index({ view }) {
    const permission = Permission.query().preload('roles').preload('users')
    return view.render('manager::views/permissions/index', { permission })
  }
}
