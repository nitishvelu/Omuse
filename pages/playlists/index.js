import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import {
	Heading,
	Link,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Input,
} from "@chakra-ui/react";

import { FiPlusCircle } from "react-icons/fi";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import Song from "../../components/Songs";
import NextLink from "next/link";
import cookie from "js-cookie";

function BasicUsage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [value, setValue] = React.useState("");
	const handleChange = (event) => setValue(event.target.value);

	return (
		<>
			<Button
				onClick={onOpen}
				leftIcon={<FiPlusCircle />}
				variant='outline'
			>
				Create New Playlist
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Enter Playlist Name</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							value={value}
							onChange={handleChange}
							size='sm'
						/>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={(e) => {
								console.log(value);
								var today = new Date();
								var dd = String(today.getDate()).padStart(
									2,
									"0"
								);
								var mm = String(today.getMonth() + 1).padStart(
									2,
									"0"
								); //January is 0!
								var yyyy = today.getFullYear();
								today = mm + "/" + dd + "/" + yyyy;

								console.log(today);
								const db = firebase.firestore();

								// create playlist
								var match = document.cookie.match(
									new RegExp("(^| )" + "uid" + "=([^;]+)")
								);
								if (match) {
									console.log(match[2]);
									let playlist = db
										.collection("playlist")
										.doc();
									playlist.set({
										name: value,
										songs: [],
										date: today,
										creator: cookie.get("name"),
										creator_id: cookie.get("uid"),
									});
									db.collection("user")
										.doc(match[2])
										.update({
											playlists:
												firebase.firestore.FieldValue.arrayUnion(
													playlist
												),
										});
								}
								onClose();

								//reloading the page after 3 seconds to see changes something else can be done
								setInterval(function () {
									location.reload();
								}, 3000);
							}}
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

function Liked({ playlist_details }) {
	console.log(playlist_details);
	return (
		<>
			<Heading>Playlists</Heading>
			{playlist_details.length == 0 ? (
				<>
					<Text fontSize='3xl'>You have no playlists !</Text>
					{BasicUsage()}
				</>
			) : (
				<>
					<VStack className='stack'>
						{Object.keys(playlist_details).map((idx) => {
							return (
								<div key={idx}>
									<NextLink
										href={
											"/playlists/" +
											playlist_details[idx].id
										}
										passHref
										key={idx}
									>
										<Link
											_hover={{ textDecor: "none" }}
											_focus={{ boxShadow: "none" }}
											key={idx}
										>
											<Text fontSize='4xl' key={idx}>
												{playlist_details[idx].name}
											</Text>
										</Link>
									</NextLink>
								</div>
							);
						})}
						{BasicUsage()}
					</VStack>
				</>
			)}
		</>
	);
}
export default withProtected(Liked);

export async function getServerSideProps({ req }) {
	let playlists = [];
	let playlist_details = [];

	const ref = await firebase
		.firestore()
		.collection("user")
		.doc(req.cookies.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				if (doc.data().playlists) {
					playlists = doc.data().playlists;
				}
			}
		});

	// getting playlist names
	for (let i = 0; i < playlists.length; i++) {
		const db = await playlists[i].get().then((doc) => {
			if (doc.exists) {
				const playlist = new Object();
				playlist.id = doc.id;
				playlist.name = doc.data().name;
				playlist_details.push(playlist);
			}
		});
	}

	return { props: { playlist_details } };
}
