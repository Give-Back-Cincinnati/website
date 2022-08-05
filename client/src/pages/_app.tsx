import '../styles/globals.scss'
import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
// import Navigation from '@/components/Navigation/navigation'
import { Button } from '@/components/Utils'
import { Footer } from '@/components/Navigation'


const gbcColors = {
  red: '#d03236', // 208, 50, 54
  black: '#333333',
}

function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Give Back Cincinnati</title>
            <meta name='description' content="Give Back Cincinnati's Website" />
            <link rel="icon" href="/favicon-16x16.ico" sizes="16x16" />
            <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" />
            <link rel="icon" href="/favicon-96x96.ico" sizes="96x96" />
        
        </Head>

        {/* <Navigation /> */}
        <Button>Hello</Button>

        <main style={{ paddingTop: 93, minHeight: 'calc(100vh - 93px)' }}>
            <Component {...pageProps} />
        </main>

        <Footer />
    </>
}

export default MyApp
