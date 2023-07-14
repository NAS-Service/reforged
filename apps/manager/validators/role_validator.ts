import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({ trim: true }),
    power: schema.number([rules.unsigned()]),
    color: schema.string.optional({ trim: true }),
    permissions: schema.array.optional().members(
      schema.string({ trim: true }, [
        rules.exists({
          table: 'permissions',
          column: 'id',
        }),
      ])
    ),
  })

  public messages: CustomMessages = {}
}
