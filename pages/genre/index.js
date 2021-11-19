import React from "react";
import {
  Flex,
  Link,
  Grid,
  GridItem,
  Text,
  IconButton,
  Icon,
  Image,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import NextLink from "next/link";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

export default function Genres() {
  return (
    // change style for genre
    <Grid
      h={["12vh", "12vh", "16vh"]}
      w={["300px", "300px", "400px"]}
      // templateRows="repeat(5, 1fr)"
      // templateColumns="repeat(5, 1fr)"
      gap={20}
      rounded="md"
    >
      {/* genre #1 */}
      <GridItem>
        <NextLink href={"/genre/r&b"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              R&B
            </MText>
          </Link>
        </NextLink>
      </GridItem>

      {/* genre #2 */}
      <GridItem>
        <NextLink href={"/genre/pop"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Pop
            </MText>
          </Link>
        </NextLink>
      </GridItem>

      {/* genre #3 */}
      <GridItem>
        <NextLink href={"/genre/rap"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Rap
            </MText>
          </Link>
        </NextLink>
      </GridItem>

      {/* genre #4 */}
      <GridItem>
        <NextLink href={"/genre/hip hop"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Hip-Hop
            </MText>
          </Link>
        </NextLink>
      </GridItem>

      {/* genre #5 */}
      <GridItem>
        <NextLink href={"/genre/soul"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Soul
            </MText>
          </Link>
        </NextLink>
      </GridItem>

      {/* genre #6 */}
      <GridItem>
        <NextLink href={"/genre/filmi"} passHref>
          <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
            <MText
              fontSize={["3xl", "3xl", "4xl"]}
              isTruncated
              margin={0}
              padding={0}
              whileHover={{
                scale: 1.009,
                color: "#AEC8CA",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Filmy
            </MText>
          </Link>
        </NextLink>
      </GridItem>
    </Grid>
  );
}
