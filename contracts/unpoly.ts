import Unpoly from 'Services/unpoly'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    unpoly: Unpoly
  }
}