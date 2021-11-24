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
	useColorModeValue,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import NextLink from "next/link";

const FieldValue = firebase.firestore.FieldValue;
var play_not_pause = true;
var is_First_play = true;
import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

const incrementStreams = (song_id, artist_id, album_name) => {
	const doc_ref = firebase.firestore().collection("song").doc(song_id);
	doc_ref.update({ no_of_streams: FieldValue.increment(1) });

	const artsit_ref = firebase.firestore().collection("artist").doc(artist_id);
	doc_ref.update({ total_streams: FieldValue.increment(1) });
};

export default function Song({ song_obj }) {
	console.group(song_obj);

	return (
		<Grid
			h={["12vh", "12vh", "16vh"]}
			w={["300px", "300px", "400px"]}
			templateRows='repeat(5, 1fr)'
			templateColumns='repeat(5, 1fr)'
			gap={1}
			rounded='md'
		>
			<GridItem rowSpan={5} colSpan={2}>
				<Link>
					<div
						className='container-main'
						onClick={function clickHandler(e) {
							const div = document.getElementById("musicPlayer");
							const player = div.childNodes[0];
							player.childNodes[0].src = song_obj.ref;
							player.childNodes[0].play();
							incrementStreams(song_obj.id, song_obj.artist_id);
						}}
					>
						<div className='content'>
							<div className='content-overlay'></div>
							<MImage
								src={song_obj.img}
								alt='album image'
								objectFit='cover'
								boxSize={["12vh", "12vh", "16vh"]}
								borderRadius='30%'
								className='content-image'
								whileHover={{
									scale: 1.05,
								}}
								// drag='xy'
								// dragConstraints={{ left: -0, right: 0 }}
								whileTap={{ scale: 0.96 }}
								fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
							/>
							<div className='content-details fadeIn-bottom'>
								<h1 className='content-title'>&#9655;</h1>
							</div>
						</div>
					</div>
				</Link>
			</GridItem>
			<GridItem rowSpan={2} colSpan={3}>
				<NextLink href={"/song/" + song_obj.id} passHref>
					<Link
						_hover={{ textDecor: "none" }}
						_focus={{ boxShadow: "none" }}
					>
						<MText
							fontSize={["3xl", "3xl", "4xl"]}
							isTruncated
							margin={0}
							padding={0}
							// color='#AEC8CA'
							whileHover={{
								scale: 1.019,
								// color: "#AEC8CA",
							}}
							whileTap={{ scale: 0.96 }}
						>
							{song_obj.name.replace(
								/(?:^|\s|["'([{])+\S/g,
								(match) => match.toUpperCase()
							)}
						</MText>
					</Link>
				</NextLink>
			</GridItem>
			{/* 
			<GridItem rowSpan={1} colSpan={3} rowEnd={5} colStart={3}>
				<Text as='sup' color='gray.500'>
					{song_obj.duration}
				</Text>
			</GridItem> */}
			<GridItem rowSpan={2} colSpan={3}>
				<NextLink href={"/artist/" + song_obj.artist_id}>
					<Link
						_hover={{ textDecor: "none" }}
						_focus={{ boxShadow: "none" }}
					>
						<MText
							color='gray.500'
							whileHover={{
								scale: 1.005,
								color: "#AEC8CA",
							}}
							whileTap={{ scale: 0.97 }}
							fontSize={["xs", "xs", "md"]}
						>
							{song_obj.artist_name.replace(
								/(?:^|\s|["'([{])+\S/g,
								(match) => match.toUpperCase()
							)}
						</MText>
					</Link>
				</NextLink>
			</GridItem>
		</Grid>
	);
}
