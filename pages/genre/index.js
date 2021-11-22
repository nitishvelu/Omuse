import React from "react";
import {
	Flex,
	Link,
	SimpleGrid,
	GridItem,
	Text,
	IconButton,
	Icon,
	Image,
	Heading,
	Box,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import NextLink from "next/link";
import GenreBox from "../../components/GenreBox";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

export default function Genres() {
	return (
		// change style for genre
		<>
			<Heading>Genres </Heading>
			<SimpleGrid
				minChildWidth={["300px", "300px", "400px"]}
				overflowX='auto'
				rounded='lg'
				height={["74%", "80%", "80%"]}
				width='full'
				spacingX={0}
				spacingY={9}
				css={{
					"&::-webkit-scrollbar": {
						width: "7px",
					},
					"&::-webkit-scrollbar-track": {
						width: "7px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "pink",
						borderRadius: "15px",
					},
				}}
			>
				<GenreBox genre='pop' color='#009DAE' />
				<GenreBox genre='r&b' color='#FFE652' />
				<GenreBox genre='soul' color='#396EB0' />
				<GenreBox genre='hip hop' color='#FFC4E1' />
				<GenreBox genre='filmy' color='#AE4CCF' />
				{/* <GenreBox genre='hip hop' color='#396EB0' /> */}
			</SimpleGrid>
		</>
	);
}
