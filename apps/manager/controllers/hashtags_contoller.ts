import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hashtag from 'Domains/articles/models/hashtag'
import { HashtagsValidator } from 'apps/manager/validators/hashtags_validator'

export default class HashtagsController {
  public async index({ view }: HttpContextContract) {
    const hashtags = await Hashtag.query().orderBy('id', 'desc')
    return view.render('manager::views/hashtags/index', { hashtags })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('manager::views/hashtags/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(HashtagsValidator)
    await Hashtag.create(data)

    return response.redirect().back()
  }

  public async show({ params, view }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    return view.render('manager::views/hashtags/show', { hashtag })
  }

  public async edit({ params, view }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    return view.render('manager::views/hashtags/edit', { hashtag })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    const data = await request.validate(HashtagsValidator)
    hashtag.merge(data)
    await hashtag.save()

    return response.redirect().back()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const hashtag = await Hashtag.query().where('slug', params.slug).firstOrFail()
    await hashtag.delete()

    return response.redirect().back()
  }
}
