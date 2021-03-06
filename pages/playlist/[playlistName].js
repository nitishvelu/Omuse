// import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import Song from "../../components/Songs";
import CoolGrid from "../../components/CoolGrid";

function Playlist({ songs_list, name }) {
	return (
		<CoolGrid title={name}>
			{Object.keys(songs_list).map((idx) => {
				return <Song song_obj={songs_list[idx]} key={idx} />;
			})}
		</CoolGrid>
	);
}
export default withProtected(Playlist);

export async function getStaticProps(context) {
	const { params, req } = context;
	let songids = [];
	let songs_list = [];
	let name = "";

	const ref = await firebase
		.firestore()
		.collection("playlist")
		.doc(params.playlistName)
		.get()
		.then((doc) => {
			if (doc.exists) {
				name = doc.data().name;
				doc.data().songs?.forEach((element) => {
					songids.push(element);
				});
			} else {
			}
		});

	let artists = [];
	let albums = [];

	//fetching song data
	for (let i = 0; i < songids.length; i++) {
		const song_obj = new Object();
		song_obj.id = songids[i];
		const db = await firebase
			.firestore()
			.collection("song")
			.doc(song_obj.id)
			.get()
			.then((doc) => {
				if (doc.exists) {
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
				}
			});
	}

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
	return { props: { songs_list, name } };
}

export async function getStaticPaths() {
	return {
		paths: ["/playlist/f6a55e83-9d2a-4683-8094-6b95bd002920"],
		fallback: true,
	};
}
