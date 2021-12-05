import React from "react";
import CreateUser from "../../components/cloudFirestore/CreateUser";

import { Text, Image, Heading } from "@chakra-ui/react";
import CoolGrid from "../../components/CoolGrid";
import { withProtected } from "../../src/hook/route";

import { motion } from "framer-motion";

import CoolBox from "../../components/CoolBox";

function App() {
	const boxcolors = [
		"#009dae",
		"#ffe652",
		"#396eb0",
		"#ffc4e1",
		"#ae4ccf",
		"#caf7e3",
		"#046582",
		"#ffc898",
	];

	return (
		<>
			<CreateUser />

			<CoolGrid title='dashboard'>
				<CoolBox
					name='Workout'
					id='f6a55e83-9d2a-4683-8094-6b95bd002920'
					color={boxcolors[0]}
					to='playlist'
					img='/images/arnold.jpg'
				/>

				<CoolBox
					name='Trending This Year'
					id='trending'
					color={boxcolors[1]}
					to='app'
					img='/images/grande.jpg'
				/>
				<CoolBox
					name='90s Hits'
					id='nintysHits'
					color={boxcolors[2]}
					to='app'
					img='/images/90.jpg'
				/>
				<CoolBox
					name='Best Of This Decade'
					id='bestOfDecade'
					color={boxcolors[3]}
					to='app'
					img='/images/abel.jpg'
				/>
				{/* test */}
				<CoolBox
					name='Pop Rising'
					id='popRising'
					color={boxcolors[4]}
					to='app'
					img='/images/jimin.jpg'
				/>
				<CoolBox
					name='This Is Eminem'
					id='TId4XDMkGSUDKKUsxJB9'
					color={boxcolors[5]}
					to='app/artist'
					img='/images/eminem.jpg'
				/>
			</CoolGrid>
		</>
	);
}
//
export default withProtected(App);
