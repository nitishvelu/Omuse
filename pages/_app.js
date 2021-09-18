import '../styles/globals.css'
import '../src/config/firebase.config'
import { AuthProvider } from '../src/hook/auth';

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  );
}

export default MyApp
