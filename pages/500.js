import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Link, Text, Image, Heading, Flex } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function Custom500() {
	return (
		<>
			<Flex
				justifyContent='center'
				alignItems='center'
				h='85vh'
				width='95%'
				flexDirection='column'
			>
				<Heading fontWeight='bold' fontSize='2xl'>
					500 | Server Error
				</Heading>
				<NextLink href='/app' passHref>
					<MotionLink
						_hover={{ textDecor: "none" }}
						_focus={{ boxShadow: "none" }}
						drag='x'
						dragConstraints={{ left: -0, right: 0 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Text color='AEC8CA'>Go Home</Text>
					</MotionLink>
				</NextLink>
			</Flex>
		</>
	);
}
