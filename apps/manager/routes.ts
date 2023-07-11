import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'app_controller.index').as('home')
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'users_controller.index').as('index')
      Route.get('/:id', 'users_controller.show').as('show')
      Route.post('/create', 'users_controller.store').as('store')
      Route.delete('/:id', 'users_controller.destroy').as('destroy')
    })
      .prefix('accounts')
      .as('accounts')

    Route.group(() => {
      Route.get('/', 'role_controller.index').as('index')
      Route.get('/:id', 'role_controller.show').as('show')
      Route.post('/create', 'role_controller.store').as('store')
      Route.delete('/:id', 'role_controller.destroy').as('destroy')
    })
      .prefix('roles')
      .as('roles')

    Route.group(() => {
      Route.get('/', 'permissions_controller.index').as('index')
    })
      .prefix('permissions')
      .as('permissions')
  }).prefix('users')
}
