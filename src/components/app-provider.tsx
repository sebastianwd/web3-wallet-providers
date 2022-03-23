import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import type { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { AppProps } from 'next/app'
import {
  walletConnecthooks,
  walletConnect,
} from '~/modules/web3/wallet-connect'

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask'
  if (connector instanceof WalletConnect) return 'WalletConnect'
  if (connector instanceof Network) return 'Network'
  return 'Unknown'
}

const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
  [walletConnect, walletConnecthooks],
]

export const AppProvider: React.FC<AppProps> = (props) => {
  const { children } = props

  const { connector } = useWeb3React()

  console.log(`Priority Connector is: ${getName(connector)}`)

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  )
}
