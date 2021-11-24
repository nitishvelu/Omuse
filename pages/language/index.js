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
					id='english'
					name='English'
					color='#009DAE'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fderulo.jpeg?alt=media&token=05666cb7-fe7e-49eb-b280-1386d7a95a48'
				/>
				{/* gjgj */}
				<CoolBox
					id='tamil'
					name='Tamil'
					color='#FFE652'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Frahaman.jpeg?alt=media&token=252ada29-ef69-45cf-aab7-3f080618fee2'
				/>
				<CoolBox
					id='kannada'
					name='Kannada'
					color='#396EB0'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fsarja.png?alt=media&token=6c2661bd-ecf9-484f-ad89-c933e3403eca'
				/>
				<CoolBox
					id='telugu'
					name='Telugu'
					color='#FFC4E1'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fdsp.jpeg?alt=media&token=fe148013-cc98-41e2-a790-6a06657bc73e'
				/>
				<CoolBox
					id='hindi'
					name='Hindi'
					color='#AE4CCF'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Farijit.jpg?alt=media&token=df55fe2a-4ba8-412e-96c7-e0694812e9c0'
				/>
				<CoolBox
					id='malayalam'
					name='Malayalam'
					color='#CAF7E3'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fvijayyesu.jpg?alt=media&token=109b0bc8-5339-4260-bec1-adf7ae3db75b'
				/>
				<CoolBox
					id='japanese'
					name='Japanese'
					color='#046582'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fkumi.jpg?alt=media&token=6622b6f6-a9a4-4e83-abe3-63488459b86c'
				/>
				<CoolBox
					id='korean'
					name='Korean'
					color='#FFC898'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fsuga.png?alt=media&token=c87d647d-22e2-4ab8-b84f-9df1b09cbef6'
				/>
			</SimpleGrid>
		</>
	);
}
