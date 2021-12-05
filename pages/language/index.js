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
import CoolBox from "../../components/CoolBox";
import { withProtected } from "../../src/hook/route";

function Language() {
	return (
		<>
			<Heading size='3xl'>Languages </Heading>
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
					id='english'
					name='English'
					color='#009DAE'
					to='language'
					img='/images/derulo.jpg'
				/>
				{/* gjgj */}
				<CoolBox
					id='tamil'
					name='Tamil'
					color='#FFE652'
					to='language'
					img='/images/rahman.jpg'
				/>
				<CoolBox
					id='kannada'
					name='Kannada'
					color='#396EB0'
					to='language'
					img='/images/sarja.jpg'
				/>
				<CoolBox
					id='telugu'
					name='Telugu'
					color='#FFC4E1'
					to='language'
					img='/images/dsp.jpg'
				/>
				<CoolBox
					id='hindi'
					name='Hindi'
					color='#AE4CCF'
					to='language'
					img='/images/arijit.jpg'
				/>
				<CoolBox
					id='malayalam'
					name='Malayalam'
					color='#CAF7E3'
					to='language'
					img='/images/vijay.jpg'
				/>
				<CoolBox
					id='japanese'
					name='Japanese'
					color='#046582'
					to='language'
					img='/images/kumi.jpg'
				/>
				<CoolBox
					id='korean'
					name='Korean'
					color='#FFC898'
					to='language'
					img='/images/suga.jpg'
				/>
			</SimpleGrid>
		</>
	);
}
export default withProtected(Language);
