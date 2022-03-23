import { initializeConnector } from '@web3-react/core'
import { Actions } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { URLS } from './chains'

export const [walletConnect, walletConnecthooks] =
  initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect(
        actions,
        {
          rpc: URLS,
        },
        true
      ),
    Object.keys(URLS).map((chainId) => Number(chainId))
  )
