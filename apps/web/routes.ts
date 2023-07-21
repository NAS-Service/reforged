import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'home_controller.index').as('home')

  Route.group(() => {
    Route.get('/signin', 'auth/authentication_controller.signin').as('auth.signin')
    Route.post('/signin', 'auth/authentication_controller.authenticate').as('auth.authenticate')
    Route.get('/signup', 'auth/authentication_controller.signup').as('auth.signup')
    Route.post('/signup', 'auth/authentication_controller.register')
      .as('auth.register')
      .middleware('turnstile')
    Route.post('/signout', 'auth/authentication_controller.signout').as('auth.signout')
  })
}
