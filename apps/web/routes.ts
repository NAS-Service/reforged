import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/authentication/login', 'authentication_controller.showLogin').as('home')
}
