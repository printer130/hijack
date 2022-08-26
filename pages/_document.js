import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es'>
      <Head />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;0,900;1,300&display=swap"
        rel="stylesheet" />
      <script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/codehighlight.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}