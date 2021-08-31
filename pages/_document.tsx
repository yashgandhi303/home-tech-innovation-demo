import NextDocument, { Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <html>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css?family=Changa+One&display=swap'
            rel='stylesheet'
          />
        </Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            `
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
