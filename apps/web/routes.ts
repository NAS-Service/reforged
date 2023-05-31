import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/authentication/login', 'authentication_controller.showSignIn').as('login')
  Route.get('/authentication/signup', 'authentication_controller.showSignUp').as('signup')
  Route.get('/oauth/:provider/redirect', 'authentication_controller.redirect').as('oauth.redirect')
  Route.get('/oauth/:provider/callback', 'authentication_controller.callback')
}
