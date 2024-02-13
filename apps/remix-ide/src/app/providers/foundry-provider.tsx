
import * as packageJson from '../../../../../package.json'
import React from 'react' // eslint-disable-line
import { FormattedMessage } from 'react-intl'
import { AbstractProvider } from './abstract-provider'

const profile = {
  name: 'foundry-provider',
  displayName: 'Selendra Provider',
  kind: 'selendra',
  description: 'Selendra provider',
  methods: ['sendAsync', 'init'],
  version: packageJson.version
}

export class FoundryProvider extends AbstractProvider {
  constructor(blockchain) {
    super(profile, blockchain, 'https://rpc0.selendra.org')
  }

  body(): JSX.Element {
    return (
      <div>
        {' '}
        <FormattedMessage id="udapp.foundryProviderText1" />
        <div className="p-1 pl-3">
          <b>curl -L https://foundry.paradigm.xyz | bash</b>
        </div>
        <div className="p-1 pl-3">
          <b>anvil</b>
        </div>
        <div className="pt-2 pb-4">
          <FormattedMessage
            id="udapp.foundryProviderText2"
            values={{
              a: (chunks) => (
                <a href="https://github.com/foundry-rs/foundry" target="_blank">
                  {chunks}
                </a>
              )
            }}
          />
        </div>
        <div>Anvil JSON-RPC Endpoint:</div>
      </div>
    )
  }
}
