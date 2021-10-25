import React from 'react'
import { withProtected } from '../src/hook/route'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';

export default function Liked({auth}) {
   
    return (
        <Flex w="100%">
        <Sidebar/>
        <Flex
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text>yooo bossss</Text>
        </Flex>
      </Flex>
    )
}
