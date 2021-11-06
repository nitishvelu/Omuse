import React from 'react'
import { withProtected } from '../src/hook/route'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';
import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text } from "@chakra-ui/layout";

function Liked() {
 
    return (
        <>
      <Text>liked</Text>
    </>
    )
}
export default withProtected(Liked)
