import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/authentication/login', 'authentication_controller.showSignIn').as('login')
  Route.get('/authentication/signup', 'authentication_controller.showSignUp').as('signup')
  Route.get('/oauth/:provider/redirect', 'social_controller.redirect').as('oauth.redirect')
  Route.get('/oauth/:provider/callback', 'social_controller.callback')
}
