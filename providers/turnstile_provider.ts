import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class Provider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    const Server = this.app.container.resolveBinding('Adonis/Core/Server')
    const TurnstileService = (await import('apps/web/services/turnstile_service')).default

    Server.hooks.before(async (ctx) => {
      ctx.turnstile = new TurnstileService(ctx)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
