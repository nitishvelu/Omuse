import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text } from "@chakra-ui/layout";
import React from "react";
import CreateUser from "../components/cloudFirestore/CreateUser";
import { withProtected } from "../src/hook/route";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function playlists({ auth }) {
  const { user, logout } = auth;

  return (
   <>
   
    <Text>playlists</Text>
   <CreateUser/>
   </>
  );
}
export default withProtected(playlists);
