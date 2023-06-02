import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'home_controller.index').as('home')

  Route.group(() => {
    Route.get('/', 'auth/authentication_controller.index').as('showLogin')
    Route.post('/', 'auth/authentication_controller.login').as('login')
    Route.delete('/', 'auth/authentication_controller.logout').as('logout')
    Route.get('/verify/email/:token', 'auth/verify_email_controller.verify').as('email.verify')
    Route.get('/signup', 'user_controller.create').as('showSignup')
    Route.post('/signup', 'user_controller.store').as('signup')

    Route.group(() => {
      Route.post('/', 'auth/magic_link_controller.sendMagicLink').as('magic_link')
      Route.get('/', 'auth/magic_link_controller.index')
      Route.get('/:email', 'auth/magic_link_controller.verifyMagicLink').as('magic_link.verify')
    }).prefix('/magic_link')
    Route.get('/:provider/redirect', 'auth/social_controller.redirect').as('oauth.redirect')
  }).prefix('/authentication')
  Route.get('/oauth/:provider/callback', 'auth/social_controller.callback')
}
