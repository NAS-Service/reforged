export interface LightningApplicationContract {
  prefix?: string
  middleware?: string[]
  domain?: string
  as?: string
}

export interface LightningConfigContract {
  domains: string[]
  applications: { [k: string]: LightningApplicationContract }
}
