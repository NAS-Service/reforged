import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { usernameValidation } from 'apps/web/validators/shared/validations'

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: usernameValidation,
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
    forward: schema.string.optional(),
  })

  public messages: CustomMessages = {
    'username.unique': 'This username is already taken',
    'email.unique': 'This account already exists',
  }
}
