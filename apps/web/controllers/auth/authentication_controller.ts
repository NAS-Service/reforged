import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignInValidator from 'apps/web/validators/auth/signin_validator'
import AuthAttemptService from 'apps/web/services/auth_attempt_service'
import SignUpValidator from 'apps/web/validators/auth/signup_validator'
import User from 'Domains/users/models/User'

export default class AuthenticationController {
  public async signin({ view, request }: HttpContextContract) {
    const { action } = request.qs()
    return view.render('auth/signin', { action })
  }

  public async authenticate({ request, response, auth, session, unpoly }: HttpContextContract) {
    let { uid, password, rememberMe, forward, action } = await request.validate(SignInValidator)

    if (!(await AuthAttemptService.hasRemainingAttempts(uid))) {
      session.flash(
        'error',
        'Your account has been locked due to repeated bad login attempts. Please reset your password.'
      )
      return response.redirect('/forgot-password')
    }

    try {
      await auth.attempt(uid, password, rememberMe)
      await AuthAttemptService.deleteBadAttempts(uid)
    } catch (error) {
      await AuthAttemptService.recordLoginAttempt(uid)

      session.flash('errors', { form: 'The provided username/email or password is incorrect' })
      return response.redirect().back()
    }

    switch (action) {
      case 'email_verification':
        forward = session.get('email_verification')
        break
    }

    session.flash('success', `Welcome back, ${auth.user!.username}!`)

    unpoly.setTarget('[up-main], [up-player], [up-header]')

    if (forward?.includes('signin') || forward?.includes('signup')) {
      forward = '/'
    }

    return response.redirect().toPath(forward ?? '/')
  }

  public async signup({ view }: HttpContextContract) {
    return view.render('pages/auth/signup')
  }

  public async register({ request, response, auth, session, unpoly }: HttpContextContract) {
    let { forward, ...data } = await request.validate(SignUpValidator)
    const user = await User.create(data)

    await auth.login(user)

    session.flash('success', `Welcome to Reforged, ${user.username}!`)

    unpoly.setTarget('[up-main], [up-player], [up-header]')

    if (forward?.includes('signin') || forward?.includes('signup')) {
      forward = '/'
    }

    return response.redirect().toPath(forward ?? '/')
  }

  public async signout({ request, response, auth, session, unpoly }: HttpContextContract) {
    const { forward } = request.only(['forward'])

    await auth.logout()

    session.flash('success', 'You have been signed out. Cya next time!')

    unpoly.setTarget('[up-main], [up-header]')

    return response.redirect().toPath(forward ?? '/')
  }
}
