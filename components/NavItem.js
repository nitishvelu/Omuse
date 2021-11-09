import React from "react";
import {
	Flex,
	Text,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function NavItem({ icon, title, navSize, to }) {
	const router = useRouter();
	const active = router.pathname === to;
	return (
		<Flex
			mt={30}
			flexDir='column'
			w='100%'
			alignItems={navSize == "small" ? "center" : "flex-start"}
		>
			<Menu id='874536983456382428328' placement='right'>
				<NextLink href={to} passHref>
					<MotionLink
						backgroundColor={active && "#AEC8CA"}
						p={3}
						borderRadius={8}
						_hover={{ textDecor: "none" }}
						_focus={{ boxShadow: "none" }}
						w={navSize == "large" && "100%"}
						drag='x'
						dragConstraints={{ left: -0, right: 0 }}
						whileHover={
							navSize == "small" ? { scale: 1.4 } : { scale: 1.1 }
						}
						whileTap={{ scale: 0.9 }}
					>
						<MenuButton w='100%'>
							<Flex>
								<Icon
									as={icon}
									fontSize='xl'
									color={active ? "#82AAAD" : "gray.500"}
								/>
								<Text
									ml={5}
									display={
										navSize == "small" ? "none" : "flex"
									}
								>
									{title}
								</Text>
							</Flex>
						</MenuButton>
					</MotionLink>
				</NextLink>
			</Menu>
		</Flex>
	);
}
