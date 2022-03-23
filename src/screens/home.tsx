import React from 'react'
import Web3 from 'web3'
import type { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { walletConnectors } from '~/modules/web3/connectors'
import styled from 'styled-components'
import { WalletIconButton } from '~/components/wallet-icon-button'

const HomeScreen = () => {
  const { activate, deactivate, active, chainId, account, error } =
    useWeb3React()

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = React.useCallback(
    (connector: AbstractConnector, type: string) => {
      activate(connector)

      localStorage.setItem('previousConnector', type)
    },
    [activate]
  )

  const disconnect = () => {
    deactivate()

    localStorage.removeItem('previousConnector')
  }

  React.useEffect(() => {
    const previousConnector = localStorage.getItem('previousConnector')

    if (previousConnector && walletConnectors[previousConnector]) {
      connect(walletConnectors[previousConnector], previousConnector)
    }
  }, [connect])

  return (
    <Container>
      <Content>
        <Header>
          <h2>Connect Wallet</h2>
        </Header>
        <ContentBody>
          <p>
            Connection Status: <code>{`${active}`}</code>
          </p>
          <p>Account: {account}</p>
          <p>Network ID: {chainId}</p>
          <ProvidersContainer>
            <WalletIconButton
              onClick={() => {
                connect(walletConnectors.injected, 'injected')
              }}
              type="metamask"
            />
            <WalletIconButton
              onClick={() => {
                connect(walletConnectors.bsc, 'bsc')
              }}
              type="bsc"
            />
            <WalletIconButton
              onClick={() => {
                connect(walletConnectors.injected, 'tw')
              }}
              type="tw"
            />
          </ProvidersContainer>
          {isUnsupportedChain && <p>Unsuported chain</p>}
          {!isUnsupportedChain && error && <p>{error.message}</p>}
          {active && <Button onClick={disconnect}>Disconnect</Button>}
        </ContentBody>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  color: #f4e8fa;
  display: flex;
  height: 100vh;
`

const Header = styled.div`
  border-radius: 10px 10px 0 0;
  padding: 24px;
  background-color: #3a2e56;
`

const ContentBody = styled.div`
  padding: 16px 24px;

  > * {
    margin-bottom: 10px;
  }
`

const ProvidersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Content = styled.div`
  display: flex;
  width: auto;
  min-width: 320px;
  max-width: 100%;
  border-radius: 10px;
  flex-direction: column;
  background-color: #27262c;
  flex-grow: 0;
  margin: auto;
`

const Button = styled.button`
  background-color: #9c83c1;
  padding: 8px 16px;
  border-radius: 14px;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin: 0 auto;
  width: 100%; ;
`

export default HomeScreen
