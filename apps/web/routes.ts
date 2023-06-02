import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'home_controller.index').as('home')

  Route.group(() => {
    // AUTHENTICATION
    Route.get('/', 'auth/authentication_controller.index').as('showLogin')
    Route.post('/', 'auth/authentication_controller.login').as('login')
    Route.delete('/', 'auth/authentication_controller.logout').as('logout')
    Route.get('/verify/email/:token', 'auth/verify_email_controller.verify').as('email.verify')

    // SIGNUP
    Route.get('/signup', 'user_controller.create').as('showSignup')
    Route.post('/signup', 'user_controller.store').as('signup')

    // MAGIC LINK
    Route.group(() => {
      Route.post('/', 'auth/magic_link_controller.sendMagicLink').as('magic_link')
      Route.get('/', 'auth/magic_link_controller.index')
      Route.get('/:email', 'auth/magic_link_controller.verifyMagicLink').as('magic_link.verify')
    }).prefix('/magic_link')

    // OAUTH
    Route.get('/:provider/redirect', 'auth/social_controller.redirect').as('oauth.redirect')

    // RESET PASSWORD
    Route.group(() => {
      Route.get('/forgot', 'auth/password_reset_controller.forgot').as('password.forgot')
      Route.post('/send', 'auth/password_reset_controller.send').as('password.send')
      Route.get('/reset/:token', 'auth/password_reset_controller.reset').as('password.reset')
      Route.post('/store', 'auth/password_reset_controller.store').as('password.store')
    }).prefix('/password')
  }).prefix('/authentication')
  Route.get('/oauth/:provider/callback', 'auth/social_controller.callback')
}
