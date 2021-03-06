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
import NextLink from "next/link";
import { ChakraNextImage } from "./ChakraNextImage";
import { motion } from "framer-motion";

const MLink = motion(Link);
const MBox = motion(Box);

export default function CoolBox({ id, name, color, to, img }) {
	return (
		<GridItem>
			<NextLink href={"/" + to + "/" + id} passHref>
				<MLink
					_hover={{ textDecor: "none" }}
					_focus={{ boxShadow: "none" }}
					whileHover={{ scale: 1.4 }}
					whileTap={{ scale: 0.9 }}
				>
					<MBox
						bg={color}
						rounded='xl'
						h={["20vh", "20vh", "35vh"]}
						w={["75vw", "73vw", "400px"]}
						whileHover={{ scale: 0.97 }}
						whileTap={{ scale: 0.9 }}
					>
						<Heading
							fontSize={["2xl", "3xl", "4xl"]}
							isTruncated
							margin={0}
							pt={[3, 4, 5]}
							pl={[3, 4, 5]}
							color='white'
							// display='inline-block'
							// whileHover={{
							// 	scale: 1.009,
							// }}
							// whileTap={{ scale: 0.96 }}
						>
							{name}
						</Heading>
						{img.length > 0 && (
							<ChakraNextImage
								overflow='hidden'
								src={img}
								alt='art'
								objectFit='cover'
								mx={["60%", "65%", "38%"]}
								my={["0px", "-13%", "2%"]}
								boxSize={["13vh", "17vh", "25vh"]}
								borderRadius='full'
								fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
							/>
						)}
					</MBox>
				</MLink>
			</NextLink>
		</GridItem>
	);
}
