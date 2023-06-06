import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.get('/', 'home_controller.index').as('home')

  Route.group(() => {
    // AUTHENTICATION
    Route.get('/', 'auth/authentication_controller.index').as('showLogin').middleware(['guest'])
    Route.post('/', 'auth/authentication_controller.login').as('login').middleware(['guest'])
    Route.delete('/', 'auth/authentication_controller.logout').as('logout').middleware(['auth'])
    Route.get('/verify/email/:token', 'auth/verify_email_controller.verify')
      .as('email.verify')
      .middleware(['guest'])

    // SIGNUP
    Route.get('/signup', 'user_controller.create').as('showSignup').middleware(['guest'])
    Route.post('/signup', 'user_controller.store').as('signup').middleware(['guest'])

    // MAGIC LINK
    Route.group(() => {
      Route.post('/', 'auth/magic_link_controller.sendMagicLink')
        .as('magic_link')
        .middleware(['guest'])
      Route.get('/', 'auth/magic_link_controller.index').middleware(['guest'])
      Route.get('/:email', 'auth/magic_link_controller.verifyMagicLink')
        .as('magic_link.verify')
        .middleware(['guest'])
    }).prefix('/magic_link')

    // OAUTH
    Route.get('/:provider/redirect', 'auth/social_controller.redirect')
      .as('oauth.redirect')
      .middleware(['guest'])

    // RESET PASSWORD
    Route.group(() => {
      Route.get('/forgot', 'auth/password_reset_controller.forgot').as('password.forgot')
      Route.post('/send', 'auth/password_reset_controller.send').as('password.send')
      Route.get('/reset/:token', 'auth/password_reset_controller.reset').as('password.reset')
      Route.post('/store', 'auth/password_reset_controller.store').as('password.store')
    })
      .prefix('/password')
      .middleware(['guest'])
  }).prefix('/authentication')
  Route.get('/oauth/:provider/callback', 'auth/social_controller.callback')
}
