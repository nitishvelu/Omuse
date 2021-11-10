// import React from "react";
import { withProtected } from "../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import Song from "../components/Songs";
import { Heading } from "@chakra-ui/react";

function Liked({ songs_list }) {
	// console.log(songs_list);
	return (
		<>
			<Heading>Favourites</Heading>

			<SimpleGrid
				minChildWidth='300px'
				overflowX='auto'
				rounded='1g'
				height='80%'
				width='full'
				spacingX={0}
				spacingY={9}
				css={{
					"&::-webkit-scrollbar": {
						width: "4px",
					},
					"&::-webkit-scrollbar-track": {
						width: "6px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "white",
						borderRadius: "24px",
					},
				}}
			>
				{Object.keys(songs_list).map((idx) => {
					return <Song song_obj={songs_list[idx]} key={idx} />;
				})}
			</SimpleGrid>
		</>
	);
}
export default withProtected(Liked);

export async function getServerSideProps({ req }) {
	let songids = [];
	let songs_list = [];

	const ref = await firebase
		.firestore()
		.collection("user")
		.doc(req.cookies.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				doc.data().liked_songs.forEach((element) => {
					songids.push(element);
				});
			} else {
			}
		});

	for (let i = 0; i < songids.length; i++) {
		const song_obj = new Object();
		song_obj.id = songids[i];
		const db = await firebase
			.firestore()
			.collection("song")
			.doc(songids[i])
			.get()
			.then((doc) => {
				if (doc.exists) {
					song_obj.name = doc.data().name;
					song_obj.genre = doc.data().genre;
					song_obj.duration = doc.data().duration;
					song_obj.year = doc.data().year;
					song_obj.no_of_likes = doc.data().no_of_likes;
					song_obj.no_of_streams = doc.data().no_of_streams;
					song_obj.language = doc.data().language;
					song_obj.ref = doc.data().cloud_reference;
					song_obj.img = doc.data().art;
					// song_obj.album = doc.data().album;
					songs_list.push(song_obj);
				}
			});
	}
	// console.log(songs_list);
	// const songs = [songs_list];
	// console.log(typeof songs);
	// songs_list = Array(songs_list);
	// console.log(typeof songs_list);
	return { props: { songs_list } };
}
