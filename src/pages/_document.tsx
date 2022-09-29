import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="preload" href='/AlternateGotNo3D_Regular.ttf' as="font" type="font/ttf" />
        </Head>
      <body>
        <Main />
        <NextScript />

        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </body>
    </Html>
  )
}