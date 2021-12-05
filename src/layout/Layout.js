import React from "react";
import Sidebar from "../../components/Sidebar";
import { HStack, VStack, Grid, GridItem, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
	FiChevronLeft,
	FiChevronRight,
	FiFastForward,
	FiPause,
	FiPauseCircle,
	FiPlay,
	FiPlayCircle,
	FiRepeat,
} from "react-icons/fi";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

export default function Layout({ children }) {
	const router = useRouter();
	if (router.pathname != "/") {
		return (
			<>
				<HStack
					width='100%'
					// overflow="hidden"
					alignItems='flex-start'
					spacing={["0.5em", "2.5em", "3.5em"]}
					height='full'
				>
					<Sidebar />
					<VStack
						pr={[0, 2, 7]}
						pt={[4, 5, 9]}
						width='100%'
						height='100vh'
						spacing={6}
						overflow='hidden'
						alignItems='flex-start'
					>
						<Grid
							h='full'
							w='full'
							templateRows='repeat(40, 1fr)'
							templateColumns='repeat(30, 1fr)'
							// gap={1}
							// rounded='md'
						>
							<GridItem rowSpan={32} colSpan={30}>
								{children}
							</GridItem>
							<GridItem rowSpan={8} colSpan={30}>
								<div id='musicPlayer'>
									<Box
										as={AudioPlayer}
										width={["75%", "80%", "90%"]}
										height={["12%", "12%", "auto"]}
										position='fixed'
										bottom={[0.1, 1, 3]}
										id='musicPlayer'
										b='grey'
										customIcons={{
											play: <FiPlayCircle />,
											pause: <FiPauseCircle />,
											rewind: <AiOutlineDoubleLeft />,
											forward: <AiOutlineDoubleRight />,
										}}
									/>
								</div>
							</GridItem>
						</Grid>
					</VStack>
				</HStack>
			</>
		);
	} else {
		return children;
	}
}
