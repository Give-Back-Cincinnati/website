import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import {Pane, Text, majorScale, defaultTheme, ThemeProvider, mergeTheme, MenuIcon} from "evergreen-ui"
import Navigation from "./navigation"
import Footer from './footer'

const gbcColors = {
  red: '#d03236', // 208, 50, 54
  black: '#333333',
}

const customTheme = {
  colors: {
    'overlay': 'rgba(0, 0, 0, .65)',
    'gbc-red': gbcColors.red,
    'gbc-black': gbcColors.black,
  },
  fontFamilies: {
    ...defaultTheme.fontFamilies,
    ui: '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    stylized: 'AlternateGotNo3D, "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  components: {
    Button: {
      appearances: {
        'gbc-red': {
          backgroundColor: gbcColors.red,
          color: 'white',
          _hover: {
            backgroundColor: '#c03236',
          },
          _active: {
            backgroundColor: '#c03236',
          },
          _focus: {
            boxShadow: '0 0 0 2px #c03236',
          },
        },
      },
    },
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider value={mergeTheme(
      defaultTheme,
      customTheme,
  )}>
    <Head>
      <title>Give Back Cincinnati</title>
      <meta name='description' content="Give Back Cincinnati's Website" />
      <link rel="icon" href="/favicon-16x16.ico" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" />
      <link rel="icon" href="/favicon-96x96.ico" sizes="96x96" />
    </Head>

    <Navigation />

    <Pane paddingTop={93} minHeight={'calc(100vh - 93px)'} is={'main'}>
      <Component {...pageProps} />
    </Pane>

    <Footer />
  </ThemeProvider>
}

export default MyApp
