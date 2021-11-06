import React from 'react'
import { withProtected } from '../src/hook/route'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';
import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text } from "@chakra-ui/layout";

export default function Liked() {
    const {colorMode,toggleColorMode}=useColorMode();
    const bg = useColorModeValue("red.500", "red.200")
    const color = useColorModeValue("white", "gray.800")
    return (
        <>
      <button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </button>
    </>
    )
}
