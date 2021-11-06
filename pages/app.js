import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text } from "@chakra-ui/layout";
import React from "react";
import CreateUser from "../components/cloudFirestore/CreateUser";
import { withProtected } from "../src/hook/route";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function App({ auth }) {
  const { user, logout } = auth;
  const {colorMode,toggleColorMode}=useColorMode();
  const bg = useColorModeValue("red.500", "red.200")
  const color = useColorModeValue("white", "gray.800")
  return (
   <>
   
    <Text>app</Text>
   <CreateUser/>
   </>
  );
}
export default withProtected(App);
