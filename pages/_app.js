import "../styles/globals.css";
import "../src/config/firebase.config";
import { AuthProvider } from "../src/hook/auth";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import firebaseInit from "../src/config/firebase.config";
import Layout from "../src/layout/Layout";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { PushSpinner } from "react-spinners-kit";
import { Chakra } from "../src/service/Chakra";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

firebaseInit();

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
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
		<>
			<Head>
				<title>Omuse</title>
				<meta
					name='description'
					content='A multi user music platform'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Chakra cookies={pageProps.cookies}>
				<AuthProvider>
					<Layout>
						<AuthStateChanged>
							{loading ? (
								<Box
									pos='absolute'
									top='50%'
									left='50%'
									transform='translate(-50%, -50%)'
								>
									<PushSpinner
										size={40}
										color='#82AAAD'
										loading={loading}
									/>
								</Box>
							) : (
								<Component {...pageProps} />
							)}
						</AuthStateChanged>
					</Layout>
				</AuthProvider>
			</Chakra>
		</>
	);
}

export default MyApp;
