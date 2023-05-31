import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/authentication/login', 'authentication_controller.showLogin').as('home')
  Route.get('/oauth/:provider/redirect', 'authentication_controller.redirect')
  Route.get('/oauth/:provider/callback', 'authentication_controller.callback')
}
