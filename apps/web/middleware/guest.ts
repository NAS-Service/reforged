import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { next } from 'sucrase/dist/types/parser/tokenizer'

export default class Guest {
  public async handle({ auth, response }: HttpContextContract) {
    if (!auth.isGuest) {
      return response.redirect().toRoute('home')
    }

    await next()
  }
}
