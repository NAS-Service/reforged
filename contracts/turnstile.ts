declare module '@ioc:Adonis/Core/HttpContext' {
  import TurnstileService from 'apps/web/services/turnstile_service'

  interface HttpContextContract {
    turnstile: TurnstileService
  }
}
