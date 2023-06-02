import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'
import { rules } from '@adonisjs/validator/build/src/Rules'

export default class AuthenticationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
