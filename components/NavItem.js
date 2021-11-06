import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'



export default function NavItem({ icon, title,navSize,to }) {
    
    const router = useRouter()
    const active = router.pathname === to
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu id="874536983456382428328" placement="right">
                <NextLink href={to} passHref>
                <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA"}}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"} >{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                </NextLink>
                
            </Menu>
        </Flex>
    )
}