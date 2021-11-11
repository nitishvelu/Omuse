import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { Box, Button, Text, VStack, IconButton } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import cookie from "js-cookie";
import { useState } from "react";
// import { FiHeart } from "react-icons/fi";
function Songdetails({ song, liked }) {
	const db = firebase.firestore();
	const [noLikes, setNoLikes] = useState(song[5]);
	const [isLiked, setIsLiked] = useState(liked);

	const [likeUnlike, setlikeUnlike] = useState(liked ? "unlike" : "like");
	// handling like event
	// db operations involved:
	// removing song from users liked song array
	// updating no of likes in song document
	const handleClick = () => {
		//unliking song
		if (isLiked) {
			setIsLiked(false);
			setNoLikes(noLikes - 1);
			setlikeUnlike("like");
			db.collection("user")
				.doc(cookie.get("uid"))
				.update({
					liked_songs: firebase.firestore.FieldValue.arrayRemove(
						song[0]
					),
				});
			db.collection("song")
				.doc(song[0])
				.update({
					no_of_likes: firebase.firestore.FieldValue.increment(-1),
				});
		}
		//liking song
		else {
			setIsLiked(true);
			setNoLikes(noLikes + 1);
			setlikeUnlike("unlike");
			db.collection("user")
				.doc(cookie.get("uid"))
				.update({
					liked_songs: firebase.firestore.FieldValue.arrayUnion(
						song[0]
					),
				});
			db.collection("song")
				.doc(song[0])
				.update({
					no_of_likes: firebase.firestore.FieldValue.increment(1),
				});
		}
	};
	return (
		<>
			<HStack>
				<VStack>
					{song.map((txt, i) => (
						<>
							<Text fontWeight='bold' fontSize='xl' key={i}>
								{txt}
							</Text>
						</>
					))}
					<Text>{noLikes}</Text>
					<button onClick={handleClick}>{likeUnlike}</button>
				</VStack>
				<CloseButton size='lg' />
			</HStack>
		</>
	);
}
export default withProtected(Songdetails);

export async function getServerSideProps(context) {
	const { params, req } = context;
	let song = [];
	let doesnotexists = false;
	await firebase
		.firestore()
		.collection("song")
		.doc(params.songid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				song.push(doc.id);
				song.push(doc.data().name);
				song.push(doc.data().year);
				song.push(doc.data().language);
				song.push(doc.data().genre);
				song.push(doc.data().no_of_likes);
			} else {
				doesnotexists = true;
			}
		});

	//checking if song is liked by the requested user
	let liked = false;
	await firebase
		.firestore()
		.collection("user")
		.doc(req.cookies.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				liked = doc.data().liked_songs?.includes(params.songid);
			} else {
			}
		});
	if (doesnotexists) {
		return { notFound: true };
	}

	return { props: { song, liked } };
}
