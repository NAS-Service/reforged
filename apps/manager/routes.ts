import Route from '@ioc:Adonis/Core/Route'
import User from 'Domains/users/models/User'
import Role from 'Domains/users/models/role'
import Permission from 'Domains/users/models/permission'

export default () => {
  Route.get('/', 'app_controller.index').as('home')
  Route.group(() => {
    Route.get('/', 'app_controller.users').as('index')
    Route.group(() => {
      Route.get('/', 'users_controller.index').as('index')
      Route.get('/:id', 'users_controller.show').as('show')
      Route.get('/create', 'users_controller.create').as('create')
      Route.post('/', 'users_controller.store').as('store')
      Route.delete('/:id', 'users_controller.destroy').as('destroy')
    }).prefix('accounts').as('accounts')

    Route.group(() => {
      Route.get('/', 'role_controller.index').as('index')
      Route.get('/:id', 'role_controller.show').as('show')
      Route.post('/create', 'role_controller.store').as('store')
      Route.delete('/:id', 'role_controller.destroy').as('destroy')
    }).prefix('roles').as('roles')

    Route.group(() => {
      Route.get('/', 'permissions_controller.index').as('index')
    }).prefix('permissions').as('permissions')
  }).prefix('users').as('users').middleware(shareUserLinks)
}

async function shareUserLinks({ view }, next): Promise<void> {
  const [user, role, permission] = await Promise.all([
    User.all(),
    Role.all(),
    Permission.all()
  ])

  const links = [
    { label: 'Dashboard', baseUrl: '/manager/users', href: 'manager.users.index', strict: true },
    { label: 'Accounts', baseUrl: '/manager/users/accounts', href: 'manager.users.accounts.index', count: user.length },
    { label: 'Roles', baseUrl: '/manager/users/roles', href: 'manager.users.roles.index', count: role.length },
    { label: 'Permissions', baseUrl: '/manager/users/permissions', href: 'manager.users.permissions.index', count: permission.length },
  ]

  await view.share({ links } as ShareData)
  await next()
}
