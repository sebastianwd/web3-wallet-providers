import Web3 from 'web3'
import { BscConnector } from '@binance-chain/bsc-connector'
import { InjectedConnector } from '@web3-react/injected-connector'

const CHAINS = {
  56: {
    urls: [
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
    ],
    name: 'Smart Chain',
    nativeCurrency: 'BNB',
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    urls: [`https://data-seed-prebsc-1-s1.binance.org:8545/`],
    name: 'Smart Chain - Testnet',
    nativeCurrency: 'BNB',
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
} as const

export const walletConnectors = {
  injected: new InjectedConnector({
    supportedChainIds: Object.keys(CHAINS).map(Number),
  }),
  bsc: new BscConnector({
    supportedChainIds: Object.keys(CHAINS).map(Number),
  }),
}

export const getLibrary = (provider) => {
  return new Web3(provider)
}
