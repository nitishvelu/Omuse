import React from "react";
import { withProtected } from "../src/hook/route";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Test from "../components/cloudFirestore/createUser";

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
          to resize the vertical navigation bar.
        </Text>
        <Test />
      </Flex>
    </Flex>
  );
}
export default withProtected(App);
