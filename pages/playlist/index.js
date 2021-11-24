import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
	Heading,
	Link,
	IconButton,
	Modal,
	Button,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Input,
} from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import Song from "../../components/Songs";
import NextLink from "next/link";
import cookie from "js-cookie";
import CoolBox from "../../components/CoolBox";

function Playlist({ playlist_details }) {
	//handling newly created playlist using use state
	const [newPlaylist, setPlaylist] = React.useState("");
	const [newPlaylistId, setId] = React.useState(uuid());

	//modal component
	function BasicUsage() {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [value, setValue] = React.useState("");
		const handleChange = (event) => setValue(event.target.value);

		return (
			<>
				<IconButton
					onClick={onOpen}
					icon={<AiOutlinePlus size='1x' />}
					variant='outline'
					size='lg'
					w='300px'
					h='300px'
				></IconButton>

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
									setPlaylist(value);
									console.log(value);
									var today = new Date();
									var dd = String(today.getDate()).padStart(
										2,
										"0"
									);
									var mm = String(
										today.getMonth() + 1
									).padStart(2, "0"); //January is 0!
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
											.doc(newPlaylistId);
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
									// setInterval(function () {
									// 	location.reload();
									// }, 3000);
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
	console.log(playlist_details);

	return (
		<>
			<Heading>Playlists</Heading>
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
				{Object.keys(playlist_details).map((idx) => {
					return (
						<CoolBox
							key={idx}
							id={playlist_details[idx].id}
							name={playlist_details[idx].name}
							color='#009DAE'
							to='playlist'
							img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fderulo.jpeg?alt=media&token=05666cb7-fe7e-49eb-b280-1386d7a95a48'
						/>
					);
				})}
				{newPlaylist ? (
					<CoolBox
						key={3}
						id={newPlaylistId}
						name={newPlaylist}
						color='#009DAE'
						to='playlist'
						img='https://firebasestorage.googleapis.com/v0/b/omuse-ac842.appspot.com/o/image_assets%2Fderulo.jpeg?alt=media&token=05666cb7-fe7e-49eb-b280-1386d7a95a48'
					/>
				) : (
					<Text></Text>
				)}

				{BasicUsage()}
			</SimpleGrid>
		</>
	);
}
export default withProtected(Playlist);

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
