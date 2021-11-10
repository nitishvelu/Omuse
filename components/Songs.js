import React from "react";
import { FiPlay, FiPause, FiHeart } from "react-icons/fi";
import { Flex, Text, IconButton, Icon, Image } from "@chakra-ui/react";
import firebase from "firebase/app";
const FieldValue = firebase.firestore.FieldValue;
var play_not_pause = true;
var is_First_play = true;

const incrementStreams = (song_id) => {
	const doc_ref = firebase.firestore().collection("song").doc(song_id);
	doc_ref.update({ no_of_streams: FieldValue.increment(1) });
};

export default function Song({ song_obj }) {
	return (
		<Flex>
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
			<Text ml={5} display={"flex"}>
				{song_obj.name}
			</Text>
			<Text ml={5} display={"flex"}>
				{song_obj.genre}
			</Text>
			<Text ml={5} display={"flex"}>
				{song_obj.duration}
			</Text>
		</Flex>
	);
}
