import { AppProps } from 'next/dist/next-server/lib/router/router';
import { UserProvider } from '../contexts/UserContext';
import '../styles/global.css';

// AppProps está na própria doc do Next
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
