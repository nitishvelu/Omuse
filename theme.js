// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// //
// 2. Add your color mode config
const config = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};
const styles = {
	global: (props) => ({
		body: {
			color: mode("teal.200", "purple.200")(props),
			bg: mode("green.50", "gray.700")(props),
		},
	}),
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

export default theme;
