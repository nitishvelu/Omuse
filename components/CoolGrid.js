import { SimpleGrid, Heading } from "@chakra-ui/layout";

function CoolGrid(props) {
	return (
		<>
			<Heading size='3xl'>
				{props.title.replace(/(?:^|\s|["'([{])+\S/g, (match) =>
					match.toUpperCase()
				)}{" "}
			</Heading>
			<SimpleGrid
				minChildWidth={["300px", "300px", "400px"]}
				overflowX='hidden'
				rounded='lg'
				height={["74%", "80%", "80%"]}
				width='full'
				spacingX={0}
				spacingY={7}
				css={{
					"&::-webkit-scrollbar": {
						width: "4px",
					},
					"&::-webkit-scrollbar-track": {
						width: "4px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#aec8ca",
						borderRadius: "15px",
					},
				}}
			>
				{props.children}
			</SimpleGrid>
		</>
	);
}

export default CoolGrid;
