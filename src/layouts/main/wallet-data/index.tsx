import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import React from 'react'
import Web3 from 'web3'
import {
  walletConnect,
  walletConnecthooks,
} from 'src/modules/web3/wallet-connect'
import { Web3ReactHooks } from '@web3-react/core'

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = walletConnecthooks

const WalletData = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()

  const ENSNames = useENSNames(provider)

  return (
    <div>
      <div>
        <b>WalletConnect</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={walletConnect}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </div>
  )
}

function Status({
  isActivating,
  error,
  isActive,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  )
}
export default WalletData
