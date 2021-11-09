import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Button, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import CreateUser from "../components/cloudFirestore/CreateUser";
import { withProtected } from "../src/hook/route";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function language() {
	return (
		<>
			<Heading>Language</Heading>
		</>
	);
}
export default withProtected(language);
