import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AppController {
  public async index({ view }: HttpContextContract) {
    return view.render('manager::views/welcome')
  }
}
