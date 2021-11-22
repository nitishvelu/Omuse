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

export default function GenreBox({ genre, color }) {
	return (
		<GridItem>
			<NextLink href={"/genre/" + genre} passHref>
				<Link
					_hover={{ textDecor: "none" }}
					_focus={{ boxShadow: "none" }}
				>
					<Box
						bg={color}
						rounded='xl'
						h={["12vh", "12vh", "35vh"]}
						w={["300px", "300px", "400px"]}
					>
						<MText
							fontSize={["3xl", "3xl", "4xl"]}
							isTruncated
							margin={0}
							padding={5}
							whileHover={{
								scale: 1.009,
								color: "#AEC8CA",
							}}
							whileTap={{ scale: 0.96 }}
						>
							{genre.charAt(0).toUpperCase() + genre.slice(1)}
						</MText>
					</Box>
				</Link>
			</NextLink>
		</GridItem>
	);
}
