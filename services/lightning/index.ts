import { LightningContract } from './contracts/lightning_contract'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ViewContract } from '@ioc:Adonis/Core/View'
import { RouterContract, RouteGroupContract } from '@ioc:Adonis/Core/Route'
import {
  LightningApplicationContract,
  LightningConfigContract,
} from 'Services/lightning/contracts/lightning_config_contract'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Lightning implements LightningContract {
  constructor(protected app: ApplicationContract) {}

  public registerApplications() {
    const lightning: LightningConfigContract = this.app.config.get('lightning', [])
    const View: ViewContract = this.app.container.resolveBinding('Adonis/Core/View')

    Object.entries(lightning.applications).forEach(([name]) => {
      View.mount(string.snakeCase(name), this.app.makePath('apps', name, 'resources'))
    })
  }

  public registerDomains() {
    const domains = this.app.config.get('lightning.domains', [])
    const connections = this.app.config.get('database.connections')

    domains.forEach((name: string) => {
      Object.entries(connections).forEach(([_, connection]: [string, any]) => {
        const paths = 'paths' in connection['migrations'] ? connection['migrations']['paths'] : []
        paths.push(this.app.makePath('domains', name, 'migrations'))

        connection['migrations']['paths'] = paths
      })
    })
  }

  public async registerRoutes() {
    const Route: RouterContract = this.app.container.resolveBinding('Adonis/Core/Route')
    const lightning: LightningConfigContract = this.app.config.get('lightning', {})

    await Promise.all(
      Object.entries(lightning.applications).map(async ([name, application]) => {
        const { default: RouteHandler } = await import(this.app.makePath('apps', name, 'routes'))

        const group = Route.group(RouteHandler)
        group.namespace('apps/' + name + '/controllers')

        this.applyRouteParameter(group, application, 'prefix')
        this.applyRouteParameter(group, application, 'middleware')
        this.applyRouteParameter(group, application, 'domain')
        this.applyRouteParameter(group, application, 'as')
      })
    )
  }

  private applyRouteParameter(route: RouteGroupContract, application: LightningApplicationContract, attribute: keyof LightningApplicationContract) {
    if (application[attribute]) {
      route[attribute](application[attribute] as any)
    }
  }
}
