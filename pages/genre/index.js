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
				<CoolBox
					id='pop'
					name='Pop'
					color='#009DAE'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Flipa.jpg?alt=media&token=0eb05e9b-7f47-4f26-8bf6-68d32a42ddc4'
				/>
				<CoolBox
					id='r&b'
					name='Rhythm And Blues'
					color='#FFE652'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fabel.jpg?alt=media&token=21d24aec-2705-4995-b7de-24a185a12881'
				/>

				<CoolBox
					id='hip hop'
					name='Hip-Hop'
					color='#396EB0'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Flamar.jpeg?alt=media&token=730f7206-1282-4b91-b46c-facb818a29de'
				/>
				<CoolBox
					id='melody'
					name='Melody'
					color='#FFC4E1'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fspb.jpg?alt=media&token=c68d5c29-7fe6-479b-a4b8-0e6cc8bac99b'
				/>
				<CoolBox
					id='rock'
					name='rock'
					color='#AE4CCF'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fpanicat.jpg?alt=media&token=c6feddf4-cbec-487b-9082-4bc20998ed65'
				/>
				<CoolBox
					id='electornic'
					name='Electronic'
					color='#CAF7E3'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fmello.jpg?alt=media&token=977c10d7-8c64-49d7-8f7a-e6657ad9c46a'
				/>
				<CoolBox
					id='jpop'
					name='Jpop'
					color='#046582'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fmello.jpg?alt=media&token=977c10d7-8c64-49d7-8f7a-e6657ad9c46a'
				/>
				<CoolBox
					id='kpop'
					name='K PoP'
					color='#FFC898'
					to='genre'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fmello.jpg?alt=media&token=977c10d7-8c64-49d7-8f7a-e6657ad9c46a'
				/>
			</SimpleGrid>
		</>
	);
}
