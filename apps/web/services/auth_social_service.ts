import {
  AllyContract,
  GithubDriverContract,
  GoogleDriverContract,
  TwitterDriverContract,
  DiscordDriverContract,
  LinkedInDriverContract,
  FacebookDriverContract,
  SocialProviders,
} from '@ioc:Adonis/Addons/Ally'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'Domains/users/models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import slugify from 'slugify'
import AssetService from 'apps/web/services/asset_service'
import { Roles } from 'apps/web/enums/roles'

export default class AuthSocialService {
  public static async getUser(
    auth: AuthContract,
    ally: AllyContract,
    provider: keyof SocialProviders
  ) {
    const social = ally.use(provider)
    const state = this.checkForErrors(social)

    if (!state.success) return { ...state, user: null }

    return this.findOrCreateUser(auth, social, provider)
  }

  public static async unlink(user: User, provider: keyof SocialProviders) {
    const userIdKey = `${provider}Id`
    const userEmailKey = `${provider}Email`
    const tokenKey = `${provider}AccessToken`

    user[userIdKey] = null
    user[userEmailKey] = null
    user[tokenKey] = null

    await user.save()
  }

  private static checkForErrors(
    social:
      | GoogleDriverContract
      | DiscordDriverContract
      | LinkedInDriverContract
      | FacebookDriverContract
      | GithubDriverContract
      | TwitterDriverContract
  ) {
    if (social.accessDenied()) {
      return { success: false, message: 'Access was denied' }
    }

    if (social.stateMisMatch()) {
      return { success: false, message: 'Request expired, please try again' }
    }

    if (social.hasError()) {
      return { success: false, message: social.getError() ?? 'An unexpected error ocurred' }
    }

    return { success: true, message: '' }
  }

  private static async findOrCreateUser(
    auth: AuthContract,
    social: GoogleDriverContract | GithubDriverContract,
    provider: keyof SocialProviders
  ) {
    const user = await social.user()
    const username = await this.getUniqueUsername(user.name)
    const userIdKey = `${provider}Id`
    const userEmailKey = `${provider}Email`
    const tokenKey = `${provider}AccessToken`

    let userMatch = await User.query()
      .if(user.email, (query) => query.where('email', user.email!))
      .orWhere(userIdKey, user.id)
      .first()

    if (!userMatch) {
      userMatch = await User.create({
        username,
        email: user.email!,
        avatarUrl: user.avatarUrl ?? undefined,
        roleId: Roles.USER,
        [userIdKey]: user.id,
        [userEmailKey]: user.email,
        [tokenKey]: user.token.token,
      })
    } else if (!auth.user && !userMatch[tokenKey]) {
      return {
        success: false,
        message: `This email is already tied to an account. Please login to your account using your email/username and password and add ${provider} through your settings.`,
      }
    } else if (!userMatch[userIdKey]) {
      userMatch[userIdKey] = user.id
      userMatch[userEmailKey] = user.email
      userMatch[tokenKey] = user.token.token
      await userMatch.save()
    }

    await AssetService.refreshAvatar(userMatch, user)

    return { success: true, user: userMatch, message: '' }
  }

  private static async getUniqueUsername(username: string) {
    if (typeof username !== 'string') {
      username = username + ''
    }

    username = slugify(username, { lower: true })

    const occurances = await Database.from('users').where('username', 'ILIKE', `${username}%`)

    return occurances.length ? `${username}-${occurances.length + 1}` : username
  }
}
