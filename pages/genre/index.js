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
import CoolBox from "../../components/CoolBox";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

export default function Genres() {
	return (
		// change style for genre
		<>
			<Heading size='3xl'>Genres </Heading>
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
				<CoolBox genre='pop' color='#009DAE' to='genre' />
				<CoolBox genre='r&b' color='#FFE652' to='genre' />
				<CoolBox genre='soul' color='#396EB0' to='genre' />
				<CoolBox genre='hip hop' color='#FFC4E1' to='genre' />
				<CoolBox genre='filmy' color='#AE4CCF' to='genre' />
				{/* <GenreBox genre='hip hop' color='#396EB0' /> */}
			</SimpleGrid>
		</>
	);
}
