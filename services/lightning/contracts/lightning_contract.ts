export interface LightningContract {
  registerApplications(): void
  registerDomains(): void
  registerRoutes(): Promise<void>
}
