import React from "react";
import Sidebar from "../../components/Sidebar";
import { HStack, VStack, Grid, GridItem, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { useColorModeValue } from "@chakra-ui/color-mode";
export default function Layout({ children }) {
	const router = useRouter();
	const value = useColorModeValue("green.50", "gray.700");
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
							<GridItem rowSpan={33} colSpan={30}>
								{children}
							</GridItem>
							<GridItem rowSpan={7} colSpan={30}>
								<Box id='musicPlayer'>
									<Box
										as={AudioPlayer}
										width={["75%", "80%", "90%"]}
										height={["12%", "12%", "auto"]}
										position='fixed'
										bottom={[1, 1, 3]}
										opacity={1}
										backgroundColor={value}
										customIcons={{
											play: <FiPlayCircle />,
											pause: <FiPauseCircle />,
											rewind: <AiOutlineDoubleLeft />,
											forward: <AiOutlineDoubleRight />,
										}}
									/>
								</Box>
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
