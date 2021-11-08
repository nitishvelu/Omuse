import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text } from "@chakra-ui/layout";
import React from "react";
import { withProtected } from "../../src/hook/route";

function Artistdetails() {

  return (
   <>
   
    <Text>artist details</Text>
   </>
  );
}
export default withProtected(Artistdetails);
