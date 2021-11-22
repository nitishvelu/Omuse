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

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);
const MLink = motion(Link);
const MBox = motion(Box);

export default function CoolBox({ genre, color, to, img }) {
	return (
		<GridItem>
			<NextLink href={"/" + to + "/" + genre} passHref>
				<MLink
					_hover={{ textDecor: "none" }}
					_focus={{ boxShadow: "none" }}
					whileHover={{ scale: 1.4 }}
					whileTap={{ scale: 0.9 }}
				>
					<MBox
						bg={color}
						rounded='xl'
						h={["35vh", "35vh", "35vh"]}
						w={["300px", "300px", "400px"]}
						whileHover={{ scale: 0.97 }}
						whileTap={{ scale: 0.9 }}
					>
						<Heading
							fontSize={["3xl", "3xl", "4xl"]}
							isTruncated
							margin={0}
							padding={5}
							color='white'
							// whileHover={{
							// 	scale: 1.009,
							// }}
							// whileTap={{ scale: 0.96 }}
						>
							{genre.charAt(0).toUpperCase() + genre.slice(1)}
						</Heading>
						<Image
							overflow='hidden'
							src={img}
							alt='art'
							objectFit='cover'
							mx={["29%", "27%", "47%"]}
							my={["5%", "5%", "5%"]}
							boxSize={["25vh", "25vh", "25vh"]}
							borderRadius='full'
							fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
						/>
					</MBox>
				</MLink>
			</NextLink>
		</GridItem>
	);
}
