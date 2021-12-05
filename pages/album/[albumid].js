import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import CoolGrid from "../../components/CoolGrid";
import Song from "../../components/Songs";

function albumDetails({ songs_list }) {
	return (
		<CoolGrid title={songs_list[0].album}>
			{Object.keys(songs_list).map((idx) => {
				return <Song song_obj={songs_list[idx]} key={idx} />;
			})}
		</CoolGrid>
	);
}
export default withProtected(albumDetails);

export async function getStaticProps(context) {
	//   const { params } = req;
	const { params, req } = context;
	let songids = [];
	let songs_list = [];
	let artists = [];
	let albums = [];
	let album = null;
	let song_objs = [];
	const ref = await firebase
		.firestore()
		.collection("album")
		.doc(params.albumid)
		.get()
		.then((docu) => {
			docu.data().songs?.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				song_objs.push(doc);
				// const song_obj = new Object();
				// song_obj.id = doc.id;
				// song_obj.name = doc.data().name;
				// song_obj.genre = doc.data().genre;
				// // song_obj.duration = doc.data().duration;
				// song_obj.year = doc.data().year;
				// song_obj.no_of_likes = doc.data().no_of_likes;
				// song_obj.no_of_streams = doc.data().no_of_streams;
				// song_obj.language = doc.data().language;
				// song_obj.ref = doc.data().cloud_reference;
				// song_obj.img = doc.data().art;
				// albums.push(doc.data().album);
				// //   song_obj.album = firebase
				// songs_list.push(song_obj);
			});
		});
	// getting songs
	for (let i = 0; i < song_objs.length; i++) {
		const db = await song_objs[i].get().then((doc) => {
			if (doc.exists) {
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
	return { props: { songs_list, album } };
}

export async function getStaticPaths() {
	const res = [];
	await firebase
		.firestore()
		.collection("album")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				res.push("/album/" + doc.id);
			});
		});

	return {
		paths: res,
		fallback: true,
	};
}
