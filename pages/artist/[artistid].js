import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { useState } from "react";
import cookie from "js-cookie";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import NextLink from "next/link";
import "firebase/firestore";
import { RiUserUnfollowLine, RiUserFollowFill } from "react-icons/ri";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Link,
} from "@chakra-ui/react";

import {
	Box,
	Button,
	Text,
	VStack,
	Heading,
	Grid,
	GridItem,
	Flex,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

function Artistdetails({ artist, following, albums }) {
	const db = firebase.firestore();
	const [noFollowers, setnoFollowers] = useState(artist.no_of_followers);
	const [isFollowing, setisFollowing] = useState(following);

	const [follow, setFollow] = useState(following ? "Unfollow" : "follow");
	// handling like event
	// db operations involved:
	// removing song from users liked song array
	// updating no of likes in song document
	const handleClick = () => {
		//unfollowing artist
		if (isFollowing) {
			setisFollowing(false);
			setnoFollowers(noFollowers - 1);
			setFollow("follow");
			db.collection("user")
				.doc(cookie.get("uid"))
				.update({
					following: firebase.firestore.FieldValue.arrayRemove(
						artist.id
					),
				});
			db.collection("artist")
				.doc(artist.id)
				.update({
					no_of_followers:
						firebase.firestore.FieldValue.increment(-1),
				});
		} else {
			setisFollowing(true);
			setnoFollowers(noFollowers + 1);
			setFollow("unfollow");
			db.collection("user")
				.doc(cookie.get("uid"))
				.update({
					following: firebase.firestore.FieldValue.arrayUnion(
						artist.id
					),
				});
			db.collection("artist")
				.doc(artist.id)
				.update({
					no_of_followers: firebase.firestore.FieldValue.increment(1),
				});
		}
	};
	if (follow === "follow") {
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
									src={artist.profile_picture}
									alt='artist image'
									objectFit='cover'
									boxSize={["35vh", "45vh", "45vh"]}
									borderRadius='30%'
									fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
								/>
							</GridItem>
							<GridItem rowSpan={[1, 1, 2]} colSpan={6}>
								{/* regex for capitalizing words in string */}
								<Heading fontSize={["3xl", "5xl", "7xl"]}>
									{artist.name.replace(
										/(?:^|\s|["'([{])+\S/g,
										(match) => match.toUpperCase()
									)}
								</Heading>
							</GridItem>
							<GridItem rowSpan={[1, 2, 2]} colSpan={6}>
								<StatGroup>
									<Stat>
										<StatLabel color='#AEC8CA'>
											Number Of Followers
										</StatLabel>
										<StatNumber>{noFollowers}</StatNumber>
									</Stat>
								</StatGroup>
							</GridItem>

							<GridItem colSpan={6}>
								<Text>{artist.self_produced}</Text>
								<Link
									href='mailto:{artist.email}'
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									{artist.email ? (
										<Heading
											fontSize={["lg", "xl", "xl"]}
											color='#AEC8CA'
										>
											{"Email: ".concat(artist.email)}
										</Heading>
									) : (
										<Heading></Heading>
									)}
								</Link>
								{/* <Text>{artist.previous_month_streams}</Text> */}
								{artist.total_streams ? (
									<Heading
										fontSize={["lg", "xl", "xl"]}
										color='#AEC8CA'
									>
										{"Total Streams: ".concat(
											artist.total_streams
										)}
									</Heading>
								) : (
									<Heading></Heading>
								)}
							</GridItem>
							<GridItem colSpan={6}>
								<Heading fontSize={["xl", "xl", "2xl"]}>
									Albums
								</Heading>
								{Object.keys(albums).map((idx) => {
									return (
										<div key={idx}>
											<NextLink
												href={
													"/album/" + albums[idx].id
												}
												passHref
											>
												<Link
													_hover={{
														textDecor: "none",
													}}
													_focus={{
														boxShadow: "none",
													}}
												>
													<Heading
														key={idx}
														color='#AEC8CA'
														fontSize={[
															"md",
															"xl",
															"xl",
														]}
													>
														{albums[
															idx
														].name.replace(
															/(?:^|\s|["'([{])+\S/g,
															(match) =>
																match.toUpperCase()
														)}
													</Heading>
												</Link>
											</NextLink>
										</div>
									);
								})}
							</GridItem>

							<GridItem rowSpan={2} colStart={5}>
								<Link
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									<Box display='inline-flex'>
										<RiUserUnfollowLine
											onClick={handleClick}
											color='red'
										/>
										<Text
											onClick={handleClick}
											pl='2'
											color='red.300'
										>
											{follow.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Text>
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
									src={artist.profile_picture}
									alt='artist image'
									objectFit='cover'
									boxSize={["35vh", "45vh", "45vh"]}
									borderRadius='30%'
									fallbackSrc='https://wallpaperaccess.com/full/2374217.png'
								/>
							</GridItem>
							<GridItem rowSpan={[1, 1, 2]} colSpan={6}>
								{/* regex for capitalizing words in string */}
								<Heading fontSize={["3xl", "5xl", "7xl"]}>
									{artist.name.replace(
										/(?:^|\s|["'([{])+\S/g,
										(match) => match.toUpperCase()
									)}
								</Heading>
							</GridItem>
							<GridItem rowSpan={[1, 2, 2]} colSpan={6}>
								<StatGroup>
									<Stat>
										<StatLabel color='#AEC8CA'>
											Number Of Followers
										</StatLabel>
										<StatNumber>{noFollowers}</StatNumber>
									</Stat>
								</StatGroup>
							</GridItem>

							<GridItem colSpan={6}>
								<Text>{artist.self_produced}</Text>
								<Link
									href='mailto:{artist.email}'
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									{artist.email ? (
										<Heading
											fontSize={["lg", "xl", "xl"]}
											color='#AEC8CA'
										>
											{"Email: ".concat(artist.email)}
										</Heading>
									) : (
										<Heading></Heading>
									)}
								</Link>
								{/* <Text>{artist.previous_month_streams}</Text> */}
								{artist.total_streams ? (
									<Heading
										fontSize={["lg", "xl", "xl"]}
										color='#AEC8CA'
									>
										{"Total Streams: ".concat(
											artist.total_streams
										)}
									</Heading>
								) : (
									<Heading></Heading>
								)}
							</GridItem>
							<GridItem colSpan={6}>
								<Heading fontSize={["xl", "xl", "2xl"]}>
									Albums
								</Heading>
								{Object.keys(albums).map((idx) => {
									return (
										<div key={idx}>
											<NextLink
												href={
													"/album/" + albums[idx].id
												}
												passHref
											>
												<Link
													_hover={{
														textDecor: "none",
													}}
													_focus={{
														boxShadow: "none",
													}}
												>
													<Heading
														key={idx}
														color='#AEC8CA'
														fontSize={[
															"md",
															"xl",
															"xl",
														]}
													>
														{albums[
															idx
														].name.replace(
															/(?:^|\s|["'([{])+\S/g,
															(match) =>
																match.toUpperCase()
														)}
													</Heading>
												</Link>
											</NextLink>
										</div>
									);
								})}
							</GridItem>

							<GridItem rowSpan={2} colStart={5}>
								<Link
									_hover={{ textDecor: "none" }}
									_focus={{ boxShadow: "none" }}
								>
									<Box display='inline-flex'>
										<RiUserFollowFill
											onClick={handleClick}
											color='green'
										/>
										<Text
											onClick={handleClick}
											pl='2'
											color='green.300'
										>
											{follow.replace(
												/(?:^|\s|["'([{])+\S/g,
												(match) => match.toUpperCase()
											)}
										</Text>
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
export default withProtected(Artistdetails);

export async function getServerSideProps(context) {
	const { params, req } = context;
	let artist = null;
	let doesnotexists = false;
	let albums_obj = null;
	await firebase
		.firestore()
		.collection("artist")
		.doc(params.artistid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				artist = new Object();
				albums_obj = doc.data().albums;
				artist.name = doc.data().name;
				// artist.console.log(doc.data());
				// artist.push(doc.data().name);
				artist.id = doc.id;
				artist.no_of_followers = doc.data().no_of_followers;
				artist.self_produced = doc.data().self_produced;
				artist.profile_picture = doc.data().profile_picture;

				if (req.cookies.typeOfUser == "Producer") {
					artist.email = doc.data().email;
					artist.previous_month_streams =
						doc.data().previous_month_streams;
					artist.total_streams = doc.data().total_streams;
				}
			} else {
				doesnotexists = true;
			}
		});
	if (doesnotexists) {
		return { notFound: true };
	}

	let following = false;

	await firebase
		.firestore()
		.collection("user")
		.doc(req.cookies.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				if (doc.data().following) {
					following = doc.data().following?.includes(params.artistid);
				}
			} else {
			}
		});

	const albums = [];
	// getting albums
	for (let i = 0; i < albums_obj.length; i++) {
		const db = await albums_obj[i].get().then((doc) => {
			if (doc.exists) {
				const al = new Object();
				al.name = doc.data().name;
				al.id = doc.id;
				albums.push(al);
			}
		});
	}

	return { props: { artist, following, albums } };
}
