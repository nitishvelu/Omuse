import "../styles/globals.css";
import "../src/config/firebase.config";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../src/hook/auth";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import firebaseInit from "../src/config/firebase.config";
import Layout from "../src/layout/Layout";

firebaseInit();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
        <AuthStateChanged>
          <Component {...pageProps} />
        </AuthStateChanged>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
