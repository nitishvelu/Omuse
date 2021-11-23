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
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fderulo.jpeg?alt=media&token=05666cb7-fe7e-49eb-b280-1386d7a95a48'
				/>
				<CoolBox
					genre='tamil'
					color='#FFE652'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Frahaman.jpeg?alt=media&token=252ada29-ef69-45cf-aab7-3f080618fee2'
				/>
				<CoolBox
					genre='kannada'
					color='#396EB0'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fsarja.png?alt=media&token=6c2661bd-ecf9-484f-ad89-c933e3403eca'
				/>
				<CoolBox
					genre='telugu'
					color='#FFC4E1'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fdsp.jpeg?alt=media&token=fe148013-cc98-41e2-a790-6a06657bc73e'
				/>
				<CoolBox
					genre='hindi'
					color='#AE4CCF'
					to='language'
					img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Farijit.jpg?alt=media&token=df55fe2a-4ba8-412e-96c7-e0694812e9c0'
				/>
				<CoolBox
					genre='electornic'
					color='#CAF7E3'
					to='genre'
					img='https://c4.wallpaperflare.com/wallpaper/144/89/99/music-marshmello-dj-marshmello-music-hd-wallpaper-thumb.jpg'
				/>
				<CoolBox
					genre='jpop'
					color='#046582'
					to='genre'
					img='https://c4.wallpaperflare.com/wallpaper/144/89/99/music-marshmello-dj-marshmello-music-hd-wallpaper-thumb.jpg'
				/>
				<CoolBox
					genre='kpop'
					color='#FFC898'
					to='genre'
					img='https://c4.wallpaperflare.com/wallpaper/144/89/99/music-marshmello-dj-marshmello-music-hd-wallpaper-thumb.jpg'
				/>
			</SimpleGrid>
		</>
	);
}
