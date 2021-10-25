import React from 'react'
import { withProtected } from '../src/hook/route'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';

function App({auth}) {
    const{user,logout}=auth;
    const photo=user?.photoURL;
    return (
        // <div>
        //     <h1>make navbar here</h1>
        //     <br></br>
        //     <h1>{user?.email}</h1>
        //     <br></br>
        //     <h1>{user?.uid}</h1>
        //     <br></br>
        //     <img src={photo}/>
        //     <br></br>
        //     <h1>{user?.displayName}</h1>
        //     <br></br>
        //     <button onClick={logout}>Logout</button>
           
        // </div>
        <Flex w="100%">
        <Sidebar/>
        <Flex
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text>Click the
            <IconButton
              background="none"
              _hover={{ background: 'none' }}
              icon={<FiMenu />}
            />
          to resize the vertical navigation bar.</Text>
        </Flex>
      </Flex>
    )
}
export default withProtected(App);