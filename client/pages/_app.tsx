import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Pane, Text, defaultTheme, ThemeProvider, mergeTheme } from "evergreen-ui"

const gbcColors = {
  red: '#d03236',
  black: '#1d1d1d',
}

const customTheme = {
  colors: {
    'gbc-red': gbcColors.red,
    'gbc-black': gbcColors.black,
  },
  fontFamilies: {
    ...defaultTheme.fontFamilies,
    ui: '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
    }
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider value={mergeTheme(
      defaultTheme,
      customTheme,
  )}>
    <Head>
      <title>Give Back Cincinnati</title>
      <meta name='description' content="Give Back Cincinnati\'s Website" />
      <link rel="icon" href="/favicon-16x16.ico" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" />
      <link rel="icon" href="/favicon-96x96.ico" sizes="96x96" />
    </Head>
    <Pane background="gray200" height={93} width='100%' is='nav'>
      <img src='/logos/half_circle.svg' width={144} height={107} alt='logo' />
    </Pane>

    <Pane paddingTop={93} minHeight={'calc(100vh - 93px)'} is={'main'}>
      <Component {...pageProps} />
    </Pane>

    <Pane background="gray400" height={50} width='100%' is='footer'>
      <Text>This is a custom footer</Text>
    </Pane>
  </ThemeProvider>
}

export default MyApp
