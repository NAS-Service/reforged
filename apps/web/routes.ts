import Route from '@ioc:Adonis/Core/Route'
export default () => {
  Route.group(() => {
    Route.get('/login', 'auth/authentication_controller.showSignIn').as('showLogin')
    Route.post('/store', 'auth/authentication_controller.login').as('login')
    Route.get('/signup', 'user_controller.create').as('showSignup')
    Route.post('/signup', 'user_controller.store').as('signup')
    Route.post('/magic_link', 'auth/magic_link_controller.sendMagicLink').as('magic_link')
    Route.get('/magic_link', 'auth/magic_link_controller.index')
    Route.get('/magic_link/:email', async ({ request }) => {
      if (request.hasValidSignature()) {
        return console.log('Marking email as verified')
      }

      return console.log('Signature is missing or URL was tampered.')
    }).as('magic_link.verify')
  }).prefix('/authentication')

  Route.group(() => {
    Route.get('/:provider/redirect', 'auth/social_controller.redirect').as('oauth.redirect')
    Route.get('/:provider/callback', 'auth/social_controller.callback')
  }).prefix('/oauth')
}
