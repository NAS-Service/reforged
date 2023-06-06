import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hashtag from 'Domains/articles/models/hashtag'

export default class HashtagsController {
  // public async index({ view }: HttpContextContract) {}
  public async create({ view }: HttpContextContract) {
    return view.render('manager::views/hashtags/create')
  }

  // public async store({ request, response }: HttpContextContract) {}
  public async show({ params, view }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    return view.render('manager::views/hashtags/show', { hashtag })
  }

  // public async edit({ params, view }: HttpContextContract) {}
  // public async update({ params, request, response }: HttpContextContract) {}
  public async destroy({ params, response }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    await hashtag.delete()

    return response.redirect().back()
  }
}
