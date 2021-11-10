import React from "react";
import Sidebar from "../../components/Sidebar";
import { HStack, VStack, Grid, GridItem, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Layout({ children }) {
	const router = useRouter();
	if (router.pathname != "/") {
		return (
			<>
				<HStack
					width='100%'
					// overflow="hidden"
					alignItems='flex-start'
					spacing='3.5em'
				>
					<Sidebar />
					<VStack
						pr={7}
						pt={9}
						width='100%'
						height='100vh'
						spacing={6}
						overflow='hidden'
						alignItems='flex-start'
					>
						{children}
						<Box
							width='90%'
							height='auto'
							position='fixed'
							bottom={4}
						>
							<AudioPlayer
								class='audioPlayer'
								src='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/after%20hours%2F09%20Blinding%20Lights.mp3?alt=media&token=77ad2d5f-6f00-40bb-9e75-cb8401ee139d'
								onPlay={(e) => console.log("onPlay")}
								// other props here
							/>
						</Box>
					</VStack>
				</HStack>
			</>
		);
	} else {
		return children;
	}
}
