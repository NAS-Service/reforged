import type { SocialProviders } from '@ioc:Adonis/Addons/Ally'
import User from '../../../domains/users/models/User'

export default class SocialAuth implements Promise<void> {
  private findOrCreateHandler: any

  constructor(private socialUser: any, private provider: keyof SocialProviders) {}

  public onFindOrCreate(cb: any) {
    this.findOrCreateHandler = cb
    return this
  }

  public async exec(): Promise<void> {
    const user = await this.updateOrCreate()
    await this.findOrCreateHandler(user)
  }

  private updateOrCreate() {
    return User.updateOrCreate(
      { oauthProviderId: this.socialUser.id, oauthProviderName: this.provider },
      {
        username:
          this.socialUser.nickName ?? this.socialUser.name ?? this.socialUser.email!.split('@')[0],
        email: this.socialUser.email!.toLowerCase(),
        avatarUrl: this.socialUser.avatarUrl!,
        oauthProviderId: this.socialUser.id,
        oauthProviderName: this.provider,
      }
    )
  }

  /**
   * Implementation of `then` for the promise API
   */
  public then(resolve: any, reject?: any): any {
    return this.exec().then(resolve, reject)
  }

  /**
   * Implementation of `catch` for the promise API
   */
  public catch(reject: any): any {
    return this.exec().catch(reject)
  }

  /**
   * Implementation of `finally` for the promise API
   */
  public finally(fullfilled: any) {
    return this.exec().finally(fullfilled)
  }

  /**
   * Required when Promises are extended
   */
  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
