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
      <meta name="description" content="Contenido escrito por loepardis sobre Hacking, Pentesting Web, Rust Lang y cosas de la Web." />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/codehighlight.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}