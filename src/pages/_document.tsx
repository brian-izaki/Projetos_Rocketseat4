import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />

          <meta
            property="description"
            content="Técnica Pomodoro para aumentar produtividade com desafios durante os descansos."
          />
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
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
