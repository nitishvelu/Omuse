import React from "react";
import { withProtected } from "../src/hook/route";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import CheckUser from "../components/cloudFirestore/createUser";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function App({ auth }) {
  const { user, logout } = auth;
  const photo = user?.photoURL;
  return (
    <Flex w="100%">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>
          Click the
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<FiMenu />}
          />
          < audio src = ""
          to resize the vertical navigation bar.
        </Text>
        <CheckUser />
      </Flex>
      {/* <ReactJkMusicPlayer {...options} /> */}
    </Flex>
  );
}
export default withProtected(App);
