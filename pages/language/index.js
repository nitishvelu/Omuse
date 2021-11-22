import React from "react";
import {
	Link,
	SimpleGrid,
	GridItem,
	Text,
	Image,
	Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);
import GenreBox from "../../components/GenreBox";

export default function Language() {
	return (
		<>
			<Heading>Languages </Heading>
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
				<GenreBox genre='english' color='#009DAE' />
				<GenreBox genre='tamil' color='#FFE652' />
				<GenreBox genre='kannada' color='#396EB0' />
				<GenreBox genre='telugu' color='#FFC4E1' />
				<GenreBox genre='hindi' color='#AE4CCF' />
				{/* <GenreBox genre='hip hop' color='#396EB0' /> */}
			</SimpleGrid>
		</>
	);
}
