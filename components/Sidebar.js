import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiLogOut,
    FiMusic,
    FiTrendingUp,
    FiHeart,
    FiGlobe,
    FiDisc,
    FiSun,
    FiMoon
} from 'react-icons/fi'
import NavItem from '../components/NavItem';
import useAuth from '../src/hook/auth';
import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";


export default function Sidebar() {
    const [navSize, changeNavSize] = useState("small");
    const auth=useAuth();
    const {user}=auth;
    const {colorMode,toggleColorMode}=useColorMode();

    // if (typeof window !== 'undefined') {
    //     localStorage.setItem('name',user?.displayName);
    // }
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" to="/app"/>
                <NavItem navSize={navSize} icon={FiMusic} title="Playlists" to="/playlists" />
                <NavItem navSize={navSize} icon={FiTrendingUp} title="Trending" to="/trending"/>
                <NavItem navSize={navSize} icon={FiHeart} title="Liked" to="/liked" />
                <NavItem navSize={navSize} icon={FiDisc} title="Genre" to="/genre"/>
                <NavItem navSize={navSize} icon={FiGlobe} title="Language" to="/language"/>
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" to="/logout"/>
               
                
                
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                 <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={colorMode=="light"?<FiSun/>:<FiMoon/>}
                    onClick={toggleColorMode}
                />
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src={user?.photoURL} />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{user?.displayName}</Heading>
                        <Text color="gray">User</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}