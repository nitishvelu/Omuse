import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Button, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { withProtected } from "../src/hook/route";

function playlists() {
	return (
		<>
			<Heading>Playlists</Heading>
		</>
	);
}
export default withProtected(playlists);
