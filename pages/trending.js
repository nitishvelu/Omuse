import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Button, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import CreateUser from "../components/cloudFirestore/CreateUser";
import { withProtected } from "../src/hook/route";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function trending() {
	return (
		<>
			<Heading>Trending</Heading>
		</>
	);
}
export default withProtected(trending);
