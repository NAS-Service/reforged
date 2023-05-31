import { LightningConfigContract } from 'Services/lightning/contracts/lightning_config_contract'

const lightningConfig: LightningConfigContract = {
  domains: ['users', 'posts'],
  applications: {
    manager: {
      middleware: [],
    },
    web: {
      middleware: [],
    },
  },
}

export default lightningConfig
