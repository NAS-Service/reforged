import { LightningConfigContract } from 'Services/lightning/contracts/lightning_config_contract'

const lightningConfig: LightningConfigContract = {
  domains: ['users', 'posts'],
  applications: {
    manager: {
      as: 'manager',
      prefix: 'manager',
    },
    web: {
      middleware: [],
    },
  },
}

export default lightningConfig
