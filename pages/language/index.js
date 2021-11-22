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

export default function Language() {
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
					genre='english'
					color='#009DAE'
					to='language'
					img='https://m.media-amazon.com/images/I/4180+9AAv0L._SL1000_.jpg'
				/>
				<CoolBox
					genre='tamil'
					color='#FFE652'
					to='language'
					img='https://in.bmscdn.com/iedb/artist/images/website/poster/large/a_r_rahman_38.jpg'
				/>
				<CoolBox genre='kannada' color='#396EB0' to='language' />
				<CoolBox genre='telugu' color='#FFC4E1' to='language' />
				<CoolBox genre='hindi' color='#AE4CCF' to='language' />
				{/* <GenreBox genre='hip hop' color='#396EB0' /> */}
			</SimpleGrid>
		</>
	);
}
