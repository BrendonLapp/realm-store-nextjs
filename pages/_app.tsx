import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
