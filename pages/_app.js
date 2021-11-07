import "../styles/globals.css";
import "../src/config/firebase.config";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../src/hook/auth";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import firebaseInit from "../src/config/firebase.config";
import Layout from "../src/layout/Layout";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { PushSpinner } from "react-spinners-kit";



firebaseInit();

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] =useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
        <AuthStateChanged>
        {loading ? (
          <PushSpinner size={40} color="#82AAAD" loading={loading} />
        ) : (
          <Component {...pageProps} />
        )}
        </AuthStateChanged>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
