import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { getLibrary } from '~/modules/web3/connectors'

export const AppProvider: React.FC<AppProps> = (props) => {
  const { children } = props

  return (
    <>
      <GlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body{
    font-family:  Kanit, 'Roboto', sans-serif;
  }

  button {
    color: inherit;
  }
`
