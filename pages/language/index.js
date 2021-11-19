import React from "react";
import { Link, Grid, GridItem, Text, Image, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

import { motion } from "framer-motion";

const MText = motion(Text);
const MImage = motion(Image);

export default function Language() {
  return (
    <>
      <Heading>Languages </Heading>
      {/* change style for lang */}
      <Grid
        h={["12vh", "12vh", "16vh"]}
        w={["300px", "300px", "400px"]}
        // templateRows="repeat(5, 1fr)"
        // templateColumns="repeat(5, 1fr)"
        gap={20}
        rounded="md"
      >
        {/* lang #1 */}
        <GridItem>
          <NextLink href={"/language/english"} passHref>
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
                English
              </MText>
            </Link>
          </NextLink>
        </GridItem>

        {/* lang #2 */}
        <GridItem>
          <NextLink href={"/language/kannada"} passHref>
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
                Kannada
              </MText>
            </Link>
          </NextLink>
        </GridItem>

        {/* lang #3 */}
        <GridItem>
          <NextLink href={"/language/tamil"} passHref>
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
                Tamil
              </MText>
            </Link>
          </NextLink>
        </GridItem>

        {/* genre #4 */}
        <GridItem>
          <NextLink href={"/language/Telugu"} passHref>
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
                Telugu
              </MText>
            </Link>
          </NextLink>
        </GridItem>

        {/* lang #5 */}
        <GridItem>
          <NextLink href={"/language/hindi"} passHref>
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
                Hindi
              </MText>
            </Link>
          </NextLink>
        </GridItem>
      </Grid>
    </>
  );
}
