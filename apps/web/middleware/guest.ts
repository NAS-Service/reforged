import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth, response }: HttpContextContract, next) {
    if (!auth.isGuest) {
      return response.redirect().toRoute('home')
    }

    await next()
  }
}
