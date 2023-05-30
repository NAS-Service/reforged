import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'app_controller.index').as('aa')

  Route.get('/test', async ({ view }) => {
    return view.render('welcome')
  }).as('bb')
}
