import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.get('/login', 'auth/authentication_controller.showSignIn').as('showLogin')
    Route.get('/signup', 'auth/authentication_controller.showSignUp').as('showSignup')
    Route.post('/store', 'auth/authentication_controller.login').as('login')
  }).prefix('/authentication')

  Route.group(() => {
    Route.get('/:provider/redirect', 'auth/social_controller.redirect').as('oauth.redirect')
    Route.get('/:provider/callback', 'auth/social_controller.callback')
  }).prefix('/oauth')
}
