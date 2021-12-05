// import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import Song from "../../components/Songs";
import CoolGrid from "../../components/CoolGrid";

function Genre({ songs_list }) {
	// console.log(songs_list);
	return (
		<CoolGrid title={songs_list[0].genre}>
			{Object.keys(songs_list).map((idx) => {
				return <Song song_obj={songs_list[idx]} key={idx} />;
			})}
		</CoolGrid>
	);
}
export default withProtected(Genre);

export async function getStaticProps(context) {
	//   const { params } = req;
	const { params, req } = context;
	let songs_list = [];
	let artists = [];
	let albums = [];
	const ref = await firebase
		.firestore()
		.collection("song")
		.where("genre", "==", params["genreName"])
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
			"/genre/rap",
			"/genre/pop",
			"/genre/hip hop",
			"/genre/r&b",
			"/genre/melody",
			"/genre/rock",
			"/genre/kpop",
			"/genre/jpop",
			"/genre/electronic",
		],
		fallback: false,
	};
}
