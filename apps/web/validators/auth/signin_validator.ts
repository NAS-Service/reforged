import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uid: schema.string(),
    password: schema.string(),
    rememberMe: schema.boolean.optional(),
    forward: schema.string.optional(),
    action: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
