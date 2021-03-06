import { Button } from "@chakra-ui/button";
import React from "react";
import { withProtected } from "../src/hook/route";
import cookie from "js-cookie";
import { motion } from "framer-motion";
const MotionButton = motion(Button);

function Logout({ auth }) {
	const { logout } = auth;
	return (
		<div>
			<MotionButton
				drag='x'
				dragConstraints={{ left: -0, right: 0 }}
				_focus={{ boxShadow: "none" }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 0.1 }}
				onClick={() => {
					logout();
					cookie.remove("uid");
					cookie.remove("name");
					cookie.remove("typeOfUser");
				}}
			>
				Logout
			</MotionButton>
		</div>
	);
}
export default withProtected(Logout);
