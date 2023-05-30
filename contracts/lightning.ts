declare module '@ioc:Adonis/Core/Application' {
  import { LightningContract } from 'Services/lightning/contracts/lightning_contract'
  export interface ContainerBindings {
    'Adonis/Addons/Lightning': LightningContract
  }
}
