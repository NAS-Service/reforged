import Permission from 'Domains/users/models/permission'

export default class PermissionsController {
  public async index({ view, request }) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const search = request.input('search')
    const permissions = await Permission.query()
      .if(search, (query) => query.where('label', 'like', `%${search}%`))
      .preload('users')
      .preload('roles')
      .paginate(page, limit)

    return view.render('manager::views/users/permissions/index', {
      permissions: permissions.toJSON(),
    })
  }
}
