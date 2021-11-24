import React from "react";
import CreateUser from "../../components/cloudFirestore/CreateUser";

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
import CoolBox from "../../components/CoolBox";

export default function Language() {
	const boxcolors = [
		"#009dae",
		"#ffe652",
		"#396eb0",
		"#ffc4e1",
		"#ae4ccf",
		"#caf7e3",
		"#046582",
		"#ffc898",
	];

	return (
		<>
			<CreateUser />
			<Heading size='3xl'>Dashboard </Heading>
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
					name='Workout'
					id='f6a55e83-9d2a-4683-8094-6b95bd002920'
					color={boxcolors[0]}
					to='playlist'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/ab67706c0000bebb783b1fe068146c9c16d31563.jpeg?alt=media&token=2e1812ec-e4c1-4876-bfa1-8c40b9a83dae'
				/>

				<CoolBox
					name='Trending this Year'
					id='trending'
					color={boxcolors[1]}
					to='app'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/jkkj.jpeg?alt=media&token=a1027eb0-edb4-4621-a634-5c400e273e52'
				/>
				<CoolBox
					name='90s hits'
					id='nintysHits'
					color={boxcolors[2]}
					to='app'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/ab67706c0000bebb783b1fe068146c9c16d31563.jpeg?alt=media&token=2e1812ec-e4c1-4876-bfa1-8c40b9a83dae'
				/>
				<CoolBox
					name='Best of this decade'
					id='bestOfDecade'
					color={boxcolors[3]}
					to='app'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/ab67706c0000bebb783b1fe068146c9c16d31563.jpeg?alt=media&token=2e1812ec-e4c1-4876-bfa1-8c40b9a83dae'
				/>
				<CoolBox
					name='Pop rising'
					id='popRising'
					color={boxcolors[4]}
					to='app'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/ab67706c0000bebb783b1fe068146c9c16d31563.jpeg?alt=media&token=2e1812ec-e4c1-4876-bfa1-8c40b9a83dae'
				/>
				<CoolBox
					name='This is Eminem'
					id='TId4XDMkGSUDKKUsxJB9'
					color={boxcolors[5]}
					to='app/artist'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/p.jpeg?alt=media&token=e90ea1a3-c8f0-4186-b653-cb495281eca4'
				/>
			</SimpleGrid>
		</>
	);
}
