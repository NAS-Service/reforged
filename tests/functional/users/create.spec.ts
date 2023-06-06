import { test } from '@japa/runner'
import Mail from '@ioc:Adonis/Addons/Mail'

test.group('users', () => {
  test('create user', async ({ client, assert }) => {
    const mailer = Mail.fake()
    const response = await client
      .post('/authentication/signup')
      .form({
        firstname: 'John',
        lastname: 'Doe',
        email: 'JohnDoe@test.fr',
        password: 'testtest',
        password_confirmation: 'testtest',
      })
      .withCsrfToken()

    assert.isTrue(mailer.exists({ subject: 'Verif Email' }))
    response.assertStatus(200)
  })
})
