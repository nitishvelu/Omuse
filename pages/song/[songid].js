import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { Box, Button, Text, VStack } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";

function Songdetails({ song }) {
	return (
		<>
			<HStack>
				<VStack>
					{song.map((txt) => (
						<Text fontWeight='bold' fontSize='xl' key={txt}>
							{txt}
						</Text>
					))}
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
				song.push(doc.data().name);
				song.push(doc.data().year);
				song.push(doc.data().language);
				song.push(doc.data().genre);
			} else {
				doesnotexists = true;
			}
		});
	if (doesnotexists) {
		return { notFound: true };
	}

	return { props: { song } };
}
