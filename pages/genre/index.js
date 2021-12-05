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
import { withProtected } from "../../src/hook/route";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

function Genres() {
	return (
		// change style for genre
		<>
			<Heading size='3xl'>Genres </Heading>
			<SimpleGrid
				minChildWidth={["300px", "300px", "400px"]}
				overflowX='hidden'
				rounded='lg'
				height={["74%", "80%", "80%"]}
				width='full'
				spacingX={0}
				spacingY={7}
				css={{
					"&::-webkit-scrollbar": {
						width: "4px",
					},
					"&::-webkit-scrollbar-track": {
						width: "4px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#aec8ca",
						borderRadius: "15px",
					},
				}}
			>
				<CoolBox
					id='pop'
					name='Pop'
					color='#009DAE'
					to='genre'
					img='/images/lipa.jpg'
				/>
				<CoolBox
					id='r&b'
					name='Rhythm And Blues'
					color='#FFE652'
					to='genre'
					img='/images/abel.jpg'
				/>

				<CoolBox
					id='hip hop'
					name='Hip-Hop'
					color='#396EB0'
					to='genre'
					img='/images/lamar.jpg'
				/>
				<CoolBox
					id='melody'
					name='Melody'
					color='#FFC4E1'
					to='genre'
					img='/images/spb.jpg'
				/>
				<CoolBox
					id='rock'
					name='Rock'
					color='#AE4CCF'
					to='genre'
					img='/images/panicat.jpg'
				/>
				<CoolBox
					id='electronic'
					name='Electronic'
					color='#CAF7E3'
					to='genre'
					img='/images/mello.jpg'
				/>
				<CoolBox
					id='jpop'
					name='Jpop'
					color='#046582'
					to='genre'
					img='/images/japane.jpg'
				/>
				<CoolBox
					id='kpop'
					name='K PoP'
					color='#FFC898'
					to='genre'
					img='/images/jimin.jpg'
				/>
			</SimpleGrid>
		</>
	);
}
export default withProtected(Genres);
