import Up from 'Services/unpoly'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    unpoly: Up
  }
}
