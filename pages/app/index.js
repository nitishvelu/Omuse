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
import { withProtected } from "../../src/hook/route";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);
import CoolBox from "../../components/CoolBox";

function App() {
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
					img='/images/arnold.jpg'
				/>

				<CoolBox
					name='Trending This Year'
					id='trending'
					color={boxcolors[1]}
					to='app'
					img='/images/grande.jpg'
				/>
				<CoolBox
					name='90s Hits'
					id='nintysHits'
					color={boxcolors[2]}
					to='app'
					img='/images/90.jpg'
				/>
				<CoolBox
					name='Best Of This Decade'
					id='bestOfDecade'
					color={boxcolors[3]}
					to='app'
					img='/images/abel.jpg'
				/>
				{/* test */}
				<CoolBox
					name='Pop Rising'
					id='popRising'
					color={boxcolors[4]}
					to='app'
					img='/images/jimin.jpg'
				/>
				<CoolBox
					name='This Is Eminem'
					id='TId4XDMkGSUDKKUsxJB9'
					color={boxcolors[5]}
					to='app/artist'
					img='/images/eminem.jpg'
				/>
			</SimpleGrid>
		</>
	);
}
//
export default withProtected(App);
