import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class LightningProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const { default: Lightning } = await import('Services/lightning')

    this.app.container.singleton('Adonis/Addons/Lightning', () => {
      return new Lightning(this.app)
    })
  }

  public async boot() {
    const lightning = this.app.container.resolveBinding('Adonis/Addons/Lightning')
    lightning.registerApplications()
    lightning.registerDomains()

    await lightning.registerRoutes()
  }
}
