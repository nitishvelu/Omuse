import React from 'react'
import Sidebar from "../../components/Sidebar";
import CheckUser from "../../components/cloudFirestore/createUser";
import { Flex, Text, IconButton } from "@chakra-ui/react";


export default function Layout({children}) {
    return (
    <>
    <Flex w="100%">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)">
        {children}
      </Flex>
    </Flex>
        </>
    )
}
