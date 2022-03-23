import 'ress/dist/ress.min.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '~/components/app-provider'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <AppProvider {...props}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
