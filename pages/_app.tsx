import '../styles/globals.css';
import type { AppProps } from 'next/app';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../components/nav/nav-bar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
