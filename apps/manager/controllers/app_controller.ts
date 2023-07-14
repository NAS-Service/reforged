import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/User'

export default class AppController {
  public async index({ view }: HttpContextContract) {
    return view.render('manager::views/index')
  }

  public async users({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('manager::views/users/index', { users })
  }
}
