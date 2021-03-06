import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
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
import cookie from "js-cookie";
import CoolBox from "../../components/CoolBox";
import CoolGrid from "../../components/CoolGrid";

function Playlist({ playlist_details }) {
	//handling newly created playlist using use state
	const [newPlaylist, setPlaylist] = React.useState("");
	const [newPlaylistId, setId] = React.useState(uuid());
	const boxcolors = [
		"#009dae",
		"#ffe652",
		"#396eb0",
		"#ffc4e1",
		"#ae4ccf",
		"#caf7e3",
		"#046582",
		"#ffc898",
	];

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
					h={["35vh", "35vh", "35vh"]}
					w={["300px", "300px", "400px"]}
					color='#AEC8CA'
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

									const db = firebase.firestore();

									// create playlist
									var match = document.cookie.match(
										new RegExp("(^| )" + "uid" + "=([^;]+)")
									);
									if (match) {
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
		<CoolGrid title='playlists'>
			{Object.keys(playlist_details).map((idx) => {
				return (
					<CoolBox
						key={idx}
						id={playlist_details[idx].id}
						name={playlist_details[idx].name}
						color={boxcolors[idx]}
						to='playlist'
						img=''
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
					img=''
				/>
			) : (
				<></>
			)}

			{BasicUsage()}
		</CoolGrid>
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
