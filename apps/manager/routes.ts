import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('test', ({ response }) => {
    return response.send('test')
  })
}
