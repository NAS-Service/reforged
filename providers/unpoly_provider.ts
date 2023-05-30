import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class UnpolyProvider {
    constructor(protected app: ApplicationContract) {}

    public async boot() {
        const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
        const Server = this.app.container.resolveBinding('Adonis/Core/Server')
        const { default: Unpoly } = await import('Services/unpoly')
    
        HttpContext.getter('unpoly', function () {
          return new Unpoly(this)
        },true)
    
        Server.hooks.before(async (ctx) => {
          ctx.view.share({ up: ctx.unpoly })
        })
    
        Server.hooks.after(async (ctx) => {
          ctx.unpoly.commit()
        })
      }
}