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
		<Flex mt={30} flexDir='row' w='100%' alignItems={"flex-start"}>
			<Flex>
				{/* <Icon as={icon}  /> */}
				<div id='song-art' style={{ width: "10vh", height: "auto" }}>
					<Image src={song_obj.img} alt='album image' />
				</div>
				<IconButton
					background='none'
					mt={5}
					_hover={{ background: "none" }}
					icon={<FiPlay />}
					onClick={function clickHandler(e) {
						const div = document.getElementById("musicPlayer");
						const player = div.childNodes[0];
						player.childNodes[0].src = song_obj.ref;
						player.childNodes[0].play();
						incrementStreams(song_obj.id);
					}}
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
		</Flex>
	);
}
