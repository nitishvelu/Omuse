// import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import {
	Box,
	Button,
	SimpleGrid,
	Text,
	VStack,
	Heading,
} from "@chakra-ui/layout";
import Song from "../../components/Songs";

function Language({ songs_list }) {
	// console.log(songs_list);
	return (
		<>
			<Heading size='3xl'>
				{songs_list[0].language.replace(
					/(?:^|\s|["'([{])+\S/g,
					(match) => match.toUpperCase()
				)}{" "}
			</Heading>

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
				{Object.keys(songs_list).map((idx) => {
					return <Song song_obj={songs_list[idx]} key={idx} />;
				})}
			</SimpleGrid>
		</>
	);
}
export default withProtected(Language);

export async function getStaticProps(context) {
	const { params, req } = context;
	let songs_list = [];
	let artists = [];
	let albums = [];
	const ref = await firebase
		.firestore()
		.collection("song")
		.where("language", "==", params["language"])
		//     .orderBy("no_of_likes", "desc")
		//     .doc("0UNwMxadPXBCXYpmi2og")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.id, " => ", doc.data());
				const song_obj = new Object();
				song_obj.id = doc.id;
				song_obj.name = doc.data().name;
				song_obj.genre = doc.data().genre;
				// song_obj.duration = doc.data().duration;
				song_obj.year = doc.data().year;
				song_obj.no_of_likes = doc.data().no_of_likes;
				song_obj.no_of_streams = doc.data().no_of_streams;
				song_obj.language = doc.data().language;
				song_obj.ref = doc.data().cloud_reference;
				song_obj.img = doc.data().art;
				albums.push(doc.data().album);
				//   song_obj.album = firebase
				songs_list.push(song_obj);
			});
		});

	// getting albums
	for (let i = 0; i < albums.length; i++) {
		const db = await albums[i].get().then((doc) => {
			if (doc.exists) {
				songs_list[i].album = doc.data().name;
				artists.push(doc.data().artist);
			}
		});
	}

	// getting artists
	for (let i = 0; i < albums.length; i++) {
		const db = await artists[i].get().then((doc) => {
			if (doc.exists) {
				songs_list[i].artist_name = doc.data().name;
				songs_list[i].artist_id = doc.id;
			}
		});
	}

	return { props: { songs_list } };
}

export async function getStaticPaths() {
	return {
		paths: [
			"/language/english",
			"/language/kannada",
			"/language/tamil",
			"/language/telugu",
			"/language/hindi",
			"/language/malayalam",
			"/language/japanese",
			"/language/korean",
		],
		fallback: false,
	};
}
