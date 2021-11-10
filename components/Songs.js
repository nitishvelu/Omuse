import React from "react";
import { FiPlay, FiPause, FiHeart } from "react-icons/fi";
import {
	Flex,
	Link,
	Grid,
	GridItem,
	Text,
	IconButton,
	Icon,
	Image,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import NextLink from "next/link";

const FieldValue = firebase.firestore.FieldValue;
var play_not_pause = true;
var is_First_play = true;
import { motion } from "framer-motion";

const incrementStreams = (song_id) => {
	const doc_ref = firebase.firestore().collection("song").doc(song_id);
	doc_ref.update({ no_of_streams: FieldValue.increment(1) });
};

export default function Song({ song_obj }) {
	return (
		<Grid
			h='12vh'
			w='300px'
			templateRows='repeat(5, 1fr)'
			templateColumns='repeat(5, 1fr)'
			gap={1}
			rounded='15px'
		>
			<GridItem rowSpan={5} colSpan={2}>
				<Link>
					<Image
						src={song_obj.img}
						alt='album image'
						objectFit='cover'
						boxSize='12vh'
						borderRadius='30'
						onClick={function clickHandler(e) {
							const div = document.getElementById("musicPlayer");
							const player = div.childNodes[0];
							player.childNodes[0].src = song_obj.ref;
							player.childNodes[0].play();
							incrementStreams(song_obj.id);
						}}
						fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
					/>
				</Link>
			</GridItem>
			<GridItem rowSpan={2} colSpan={3}>
				<NextLink href={"/song/" + song_obj.id} passHref>
					<Link
						_hover={{ textDecor: "none" }}
						_focus={{ boxShadow: "none" }}
					>
						<Text
							fontSize='3xl'
							isTruncated
							_hover={{
								color: "teal.500",
								fontWeight: "semibold",
							}}
						>
							{song_obj.name}
						</Text>
					</Link>
				</NextLink>
			</GridItem>

			<GridItem rowSpan={1} colspan={3} rowEnd={5} colStart={3}>
				<Text as='sup' color='gray.500'>
					{song_obj.genre}
				</Text>
			</GridItem>
			<GridItem rowSpan={1} colSpan={3}>
				<Text as='sub' color='gray.500'>
					{song_obj.duration}
				</Text>
			</GridItem>
		</Grid>
	);
}
