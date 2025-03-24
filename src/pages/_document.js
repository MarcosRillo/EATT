import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const styledComponentsSheet = new ServerStyleSheet();
    const materialUiSheets = new ServerStyleSheet();
    const emotionSheets = new ServerStyleSheet();
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return (
              <React.Fragment>
                {styledComponentsSheet.collectStyles(<App {...props} />)}
                {materialUiSheets.collectStyles(<App {...props} />)}
                {emotionSheets.collectStyles(<App {...props} />)}
              </React.Fragment>
            );
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        styledComponentsSheet.getStyleElement(),
        materialUiSheets.getStyleElement(),
        emotionSheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
