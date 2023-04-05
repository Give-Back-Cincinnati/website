import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head />
      <body>
        <Main />
        <NextScript />

        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </body>
    </Html>
  )
}