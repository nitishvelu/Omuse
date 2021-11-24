import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
	Box,
	Button,
	Text,
	VStack,
	IconButton,
	Heading,
} from "@chakra-ui/layout";
import {
	Flex,
	Link,
	Image,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Select,
	GridItem,
	Grid,
	AlertIcon,
} from "@chakra-ui/react";
// import { IconButton } from "@chakra-ui/react"
import { CloseButton } from "@chakra-ui/react";
import cookie from "js-cookie";
import { useState } from "react";
import router from "next/router";
import Song from "../../components/Songs";

function Songdetails({ song_obj, liked, playlists }) {
	const db = firebase.firestore();
	const router = useRouter();
	const [noLikes, setNoLikes] = useState(song_obj.no_of_likes);
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
						song_obj.id
					),
				});
			db.collection("song")
				.doc(song_obj.id)
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
						song_obj.id
					),
				});
			db.collection("song")
				.doc(song_obj.id)
				.update({
					no_of_likes: firebase.firestore.FieldValue.increment(1),
				});
		}
	};
	if (likeUnlike == "unlike") {
		return (
			<>
				<Flex h='80%' w='100%' justifyContent='center'>
					<Flex
						pos='sticky'
						left={["3", "4", "5"]}
						h={["80vh", "55vh", "55vh"]}
						// h='95vh'
						marginTop='2.5vh'
						boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.439)'
						borderRadius='19px'
						width={["300px", "70%", "70%"]}
						padding='2%'
						// marginLeft={["0px", "2", "5%"]}
						margin='auto'
						textAlign='center'
						// w={navSize == "small" ? "75px" : "200px"}
						// flexDir="column"
						// justifyContent="space-between"
					>
						<Grid
							h={["80vh", "45vh", "45vh"]}
							w='full'
							templateRows='repeat(10, 1fr)'
							templateColumns='repeat(10, 1fr)'
							gap={2}
							rounded='md'
						>
							<GridItem
								rowSpan={[5, 10, 10]}
								colSpan={[10, 4, 4]}
							>
								<Image
									src={song_obj.img}
									alt=''
									objectFit='cover'
									boxSize={["35vh", "45vh", "45vh"]}
									borderRadius='30%'
									fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
								/>
							</GridItem>
							<GridItem rowSpan={[1, 1, 2]} colSpan={6}>
								{/* regex for capitalizing words in string */}
								<Heading fontSize={["3xl", "5xl", "7xl"]}>
									{song_obj.name
										.replace(
											/(?:^|\s|["'([{])+\S/g,
											(match) => match.toUpperCase()
										)
										.slice(0, 16)
										.concat("..")}
								</Heading>
							</GridItem>
							<GridItem colSpan={6}>
								<NextLink
									href={"/artist/" + song_obj.artist_id}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading
											fontSize={["xl", "xl", "3xl"]}
											color='#AEC8CA'
										>
											{song_obj.artist_name.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem rowSpan={[1, 2, 2]} colSpan={6}>
								<StatGroup>
									<Stat>
										<StatLabel color='#AEC8CA'>
											Number of Likes
										</StatLabel>
										<StatNumber>{noLikes}</StatNumber>
										<StatHelpText>
											<StatArrow type='increase' />
											{song_obj.year} To Now
										</StatHelpText>
									</Stat>
								</StatGroup>
							</GridItem>

							<GridItem colSpan={6}>
								<NextLink
									href={"/album/" + song_obj.album_id}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading fontSize={["xl", "xl", "3xl"]}>
											{song_obj.album.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem colSpan={6}>
								<NextLink
									href={"/language/" + song_obj.language}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading
											color='#AEC8CA'
											fontSize={["lg", "xl", "xl"]}
										>
											{song_obj.language.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem colSpan={6}>
								<Heading
									color='#AEC8CA'
									fontSize={["lg", "xl", "xl"]}
								>
									{song_obj.year}
								</Heading>
							</GridItem>
							<GridItem colSpan={6}>
								<Select
									icon={<FiPlusSquare />}
									variant='unstyled'
									placeholder='Add to playlists'
									onChange={(e) => {
										if (!e.target.value) return;
										if (
											e.target.value ==
											"Create new playlist"
										) {
											router.push("/playlist");
										} else {
											router.back();
											db.collection("playlist")
												.doc(e.target.value)
												.update({
													songs: firebase.firestore.FieldValue.arrayUnion(
														song_obj.id
													),
												});
										}
									}}
								>
									{Object.keys(playlists).map((idx) => {
										return (
											<option
												value={playlists[idx].id}
												key={idx}
											>
												{playlists[idx].name}
											</option>
										);
									})}

									<option id='0'>Create new playlist</option>
								</Select>
							</GridItem>

							<GridItem rowSpan={2} colStart={5}>
								<Link
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									<Box display='inline-flex'>
										<FaHeart
											onClick={handleClick}
											color='red'
										/>
										{/* <Text
                  onClick={handleClick}
                  pl='2'
                  color='green.300'
                >
                  {follow.replace(
                    /(?:^|\s|["'([{])+\S/g,
                    (match) => match.toUpperCase()
                  )}
                </Text> */}
									</Box>
								</Link>
							</GridItem>
						</Grid>
					</Flex>
				</Flex>
			</>
		);
	} else {
		return (
			<>
				<Flex h='80%' w='100%' justifyContent='center'>
					<Flex
						pos='sticky'
						left={["3", "4", "5"]}
						h={["80vh", "55vh", "55vh"]}
						// h='95vh'
						marginTop='2.5vh'
						boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.439)'
						borderRadius='19px'
						width={["300px", "70%", "70%"]}
						padding='2%'
						// marginLeft={["0px", "2", "5%"]}
						margin='auto'
						textAlign='center'
						// w={navSize == "small" ? "75px" : "200px"}
						// flexDir="column"
						// justifyContent="space-between"
					>
						<Grid
							h={["80vh", "45vh", "45vh"]}
							w='full'
							templateRows='repeat(10, 1fr)'
							templateColumns='repeat(10, 1fr)'
							gap={2}
							rounded='md'
						>
							<GridItem
								rowSpan={[5, 10, 10]}
								colSpan={[10, 4, 4]}
							>
								<Image
									src={song_obj.img}
									alt=''
									objectFit='cover'
									boxSize={["35vh", "45vh", "45vh"]}
									borderRadius='30%'
									fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
								/>
							</GridItem>
							<GridItem rowSpan={[1, 1, 2]} colSpan={6}>
								{/* regex for capitalizing words in string */}
								<Heading fontSize={["3xl", "5xl", "7xl"]}>
									{song_obj.name
										.replace(
											/(?:^|\s|["'([{])+\S/g,
											(match) => match.toUpperCase()
										)
										.slice(0, 16)
										.concat("..")}
								</Heading>
							</GridItem>
							<GridItem colSpan={6}>
								<NextLink
									href={"/artist/" + song_obj.artist_id}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading
											fontSize={["xl", "xl", "3xl"]}
											color='#AEC8CA'
										>
											{song_obj.artist_name.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem rowSpan={[1, 2, 2]} colSpan={6}>
								<StatGroup>
									<Stat>
										<StatLabel color='#AEC8CA'>
											Number of Likes
										</StatLabel>
										<StatNumber>{noLikes}</StatNumber>
										<StatHelpText>
											<StatArrow type='increase' />
											{song_obj.year} To Now
										</StatHelpText>
									</Stat>
								</StatGroup>
							</GridItem>

							<GridItem colSpan={6}>
								<NextLink
									href={"/album/" + song_obj.album_id}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading fontSize={["xl", "xl", "3xl"]}>
											{song_obj.album.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem colSpan={6}>
								<NextLink
									href={"/language/" + song_obj.language}
									passHref
								>
									<Link
										_hover={{ textDecor: "none" }}
										_focus={{ boxShadow: "none" }}
									>
										<Heading
											color='#AEC8CA'
											fontSize={["lg", "xl", "xl"]}
										>
											{song_obj.language.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Heading>
									</Link>
								</NextLink>
							</GridItem>
							<GridItem colSpan={6}>
								<Heading
									color='#AEC8CA'
									fontSize={["lg", "xl", "xl"]}
								>
									{song_obj.year}
								</Heading>
							</GridItem>
							<GridItem colSpan={6}>
								<Select
									icon={<FiPlusSquare />}
									variant='unstyled'
									placeholder='Add to playlists'
									onChange={(e) => {
										console.log(e.target.value);
										if (!e.target.value) return;
										if (
											e.target.value ==
											"Create new playlist"
										) {
											router.push("/playlist");
										} else {
											router.back();
											db.collection("playlist")
												.doc(e.target.value)
												.update({
													songs: firebase.firestore.FieldValue.arrayUnion(
														song_obj.id
													),
												});
										}
									}}
								>
									{Object.keys(playlists).map((idx) => {
										return (
											<option
												value={playlists[idx].id}
												key={idx}
											>
												{playlists[idx].name}
											</option>
										);
									})}

									<option id='0'>Create new playlist</option>
								</Select>
							</GridItem>

							<GridItem rowSpan={2} colStart={5}>
								<Link
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									<Box display='inline-flex'>
										<FaRegHeart
											onClick={handleClick}
											color='red'
										/>
										{/* <Text
                    onClick={handleClick}
                    pl='2'
                    color='green.300'
                  >
                    {follow.replace(
                      /(?:^|\s|["'([{])+\S/g,
                      (match) => match.toUpperCase()
                    )}
                  </Text> */}
									</Box>
								</Link>
							</GridItem>
						</Grid>
					</Flex>
				</Flex>
			</>
		);
	}
}
export default withProtected(Songdetails);

export async function getServerSideProps(context) {
	const { params, req } = context;
	let artist = null;
	var album = null;
	var song_obj = null;
	var playlists_obj = [];
	var playlists = [];

	const ref = await firebase
		.firestore()
		.collection("song")
		.doc(params["songid"])
		.get()
		.then((doc) => {
			if (doc.exists) {
				song_obj = new Object();
				song_obj.id = doc.id;
				song_obj.name = doc.data().name;
				song_obj.genre = doc.data().genre;
				song_obj.year = doc.data().year;
				song_obj.no_of_likes = doc.data().no_of_likes;
				song_obj.no_of_streams = doc.data().no_of_streams;
				song_obj.language = doc.data().language;
				song_obj.ref = doc.data().cloud_reference;
				song_obj.img = doc.data().art;
				album = doc.data().album;
			} else {
			}
		});

	// getting albums
	const db1 = await album.get().then((doc) => {
		if (doc.exists) {
			song_obj.album = doc.data().name;
			song_obj.album_id = doc.id;
			artist = doc.data().artist;
		}
	});

	// getting artists
	const db2 = await artist.get().then((doc) => {
		if (doc.exists) {
			song_obj.artist_name = doc.data().name;
			song_obj.artist_id = doc.id;
		}
	});

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

	await firebase
		.firestore()
		.collection("user")
		.doc(req.cookies.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				doc.data().playlists?.forEach((element) => {
					playlists_obj.push(element);
				});
			}
		});

	for (let i = 0; i < playlists_obj.length; i++) {
		const rest = await playlists_obj[i].get().then((doc) => {
			if (doc.exists) {
				var playlist = new Object();
				playlist.name = doc.data().name;
				playlist.id = doc.id;
				playlists.push(playlist);
			}
		});
	}

	return { props: { song_obj, liked, playlists } };
}
//
