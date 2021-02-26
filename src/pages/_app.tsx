import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/global.css';

// AppProps está na própria doc do Next
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
