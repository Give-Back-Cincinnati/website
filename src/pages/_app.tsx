import '../styles/globals.scss'
import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/DataDisplay/Toaster'

import { ThemeProvider } from '@mui/material/styles'
import { CreateThemeHook } from 'hooks'
import { store, actions } from 'store'
import { Provider } from 'react-redux'
import { createServices } from 'services'
createServices(store, actions)

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: JSX.Element)
        => React.ReactNode
}
  
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const theme = CreateThemeHook()

    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Head>
                <title>Give Back Cincinnati</title>
                <meta name='description' content="Give Back Cincinnati's Website" />
                <link rel="icon" href="/favicon-16x16.ico" sizes="16x16" />
                <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" />
                <link rel="icon" href="/favicon-96x96.ico" sizes="96x96" />
                <link rel="preload" href='/AlternateGotNo3D_Regular.ttf' as="font" type="font/ttf" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <Navigation />

            <main style={{ paddingTop: 93, minHeight: 'calc(100vh - 93px)' }}>
                {
                    // @ts-ignore
                    getLayout(<Component {...pageProps} />)
                }
            </main>

            <Footer />

            <Toaster />
        </Provider>
    </ThemeProvider>
}

export default MyApp
