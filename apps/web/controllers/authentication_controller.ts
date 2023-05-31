import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialAuth from 'apps/web/services/social_auth'
import User from 'Domains/users/models/User'

export default class AuthenticationController {
  public async showSignIn({ view }: HttpContextContract) {
    return view.render('manager::views/welcome')
  }

  public async showSignUp({ view }: HttpContextContract) {
    return view.render('web::views/authentication/store')
  }

  public async redirect({ ally, params }: HttpContextContract) {
    return await ally.use(params.provider).redirect()
  }

  public async callback({ ally, auth, params, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await new SocialAuth(socialUser, params.provider).onFindOrCreate(async (user: User) => {
      await auth.login(user)

      response.redirect().toRoute('aa')
    })
  }
}
