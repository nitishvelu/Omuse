// import React from "react";
import { withProtected } from "../../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import Song from "../../../components/Songs";
import { connectScrollTo } from "react-instantsearch-core";
import CoolGrid from "../../../components/CoolGrid";

function Trending({ songs_list }) {
	return (
		<CoolGrid title={songs_list[0].artist_name}>
			{Object.keys(songs_list).map((idx) => {
				return <Song song_obj={songs_list[idx]} key={idx} />;
			})}
		</CoolGrid>
	);
}
export default withProtected(Trending);

export async function getStaticProps(context) {
	const { params } = context;
	let song_objs = [];
	let songs_list = [];
	let artists = [];
	let albums = [];
	let artist_name = "";

	const test = await firebase
		.firestore()
		.collection("artist")
		.doc(params["id"])
		.get()
		.then((doc) => {
			artist_name = doc.data().name;
			doc.data().albums?.forEach((element) => {
				albums.push(element);
			});
		});
	let songs = null;

	// getting artists
	for (let i = 0; i < albums.length; i++) {
		const db = await albums[i].get().then((doc) => {
			doc.data().songs?.forEach((element) => {
				song_objs.push(element);
				const song_obj = new Object();
				song_obj.album = doc.data().name;
				songs_list.push(song_obj);
			});
		});
	}

	for (let i = 0; i < song_objs.length; i++) {
		const db = await song_objs[i].get().then((doc) => {
			if (doc.exists) {
				songs_list[i].id = doc.id;
				songs_list[i].name = doc.data().name;
				songs_list[i].genre = doc.data().genre;
				songs_list[i].year = doc.data().year;
				songs_list[i].no_of_likes = doc.data().no_of_likes;
				songs_list[i].no_of_streams = doc.data().no_of_streams;
				songs_list[i].language = doc.data().language;
				songs_list[i].ref = doc.data().cloud_reference;
				songs_list[i].img = doc.data().art;
				songs_list[i].artist_name = artist_name;
				songs_list[i].artist_id = params["id"];
			}
		});
	}

	return { props: { songs_list } };
}
export async function getStaticPaths() {
	return {
		paths: ["/app/artist/TId4XDMkGSUDKKUsxJB9"],
		fallback: true,
	};
}
