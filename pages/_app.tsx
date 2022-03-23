import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import MainLayout from 'src/layouts/main'
import { AppProvider } from '~/components/app-provider'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <AppProvider {...props}>
      <ChakraProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp
