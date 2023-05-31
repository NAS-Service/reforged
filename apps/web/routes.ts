import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.get('/login', 'auth/authentication_controller.showSignIn').as('showLogin')
    Route.post('/login', 'auth/authentication_controller.login').as('login')
    Route.get('/signup', 'user_controller.create').as('showSignup')
    Route.post('/signup', 'user_controller.store').as('signup')
  }).prefix('/authentication')

  Route.group(() => {
    Route.get('/:provider/redirect', 'auth/social_controller.redirect').as('oauth.redirect')
    Route.get('/:provider/callback', 'auth/social_controller.callback')
  }).prefix('/oauth')
}
