// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
// const config = {
// 	initialColorMode: "dark",
// 	useSystemColorMode: true,
// };
// const styles = {
// 	global: (props) => ({
// 		body: {
// 			color: mode("pink.800", "red.900")(props),
// 			bg: mode("blue.100", "#141214")(props),
// 		},
// 	}),
// };

// // 3. extend the theme
// const theme = extendTheme({ config, styles });

const theme = extendTheme({
	styles: {
		global: (props) => ({
			body: {
				fontFamily: "body",
				color: mode("gray.800", "whiteAlpha.900")(props),
				bg: mode("pink", "gray.800")(props),
				lineHeight: "base",
			},
		}),
	},
});

export default theme;
