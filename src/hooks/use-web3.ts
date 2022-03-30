import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React from 'react'
import Web3 from 'web3'
import { walletConnectors } from '~/modules/web3/connectors'
import { getTokensBalance } from '@iam4x/bsc-scan'
import { ethers } from 'ethers'

const connectorKeyName = 'previousConnector'

export const useWeb3 = () => {
  const { activate, deactivate, error, library, account } = useWeb3React<Web3>()

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = React.useCallback(
    (connector: AbstractConnector, type: string) => {
      activate(connector)

      localStorage.setItem(connectorKeyName, type)
    },
    [activate]
  )

  const disconnect = () => {
    deactivate()

    localStorage.removeItem(connectorKeyName)
  }

  const getERC20Balance = async (tokenAddress: string, tokenDecimals = 18) => {
    if (!account) {
      return 0
    }

    const tokensBalance = await getTokensBalance(
      library?.givenProvider,
      account,
      [tokenAddress]
    )

    return ethers.utils.formatUnits(tokensBalance[tokenAddress], tokenDecimals)
  }

  React.useEffect(() => {
    const previousConnector = localStorage.getItem(connectorKeyName)

    if (previousConnector && walletConnectors[previousConnector]) {
      connect(walletConnectors[previousConnector], previousConnector)
    }
  }, [connect])

  return {
    ...useWeb3React(),
    getERC20Balance,
    connect,
    disconnect,
    isUnsupportedChain,
  }
}
