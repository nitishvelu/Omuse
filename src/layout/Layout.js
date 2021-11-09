import React from "react";
import Sidebar from "../../components/Sidebar";
import { HStack, VStack, Text, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
	const router = useRouter();
	if (router.pathname != "/") {
		return (
			<>
				<HStack
					width='100%'
					// overflow="hidden"
					alignItems='flex-start'
					spacing='3.5em'
				>
					<Sidebar />
					<VStack
						px={0}
						pt={9}
						width='full'
						height='full'
						spacing={6}
						overflow='hidden'
						alignItems='flex-start'
					>
						{children}
					</VStack>
				</HStack>
			</>
		);
	} else {
		return children;
	}
}
