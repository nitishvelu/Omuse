import React from 'react'
import Sidebar from "../../components/Sidebar";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { useRouter } from 'next/router';


export default function Layout({children}) {
    const router=useRouter();
    if(router.pathname!="/"){
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
    )}else{
        return children;
    }
}
