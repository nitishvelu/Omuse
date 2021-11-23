import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { useState } from "react";
import cookie from "js-cookie";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import NextLink from "next/link";
import "firebase/firestore";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Link,
} from "@chakra-ui/react";

import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

function Artistdetails({ artist, following, albums }) {
  const db = firebase.firestore();
  const [noFollowers, setnoFollowers] = useState(artist.no_of_followers);
  const [isFollowing, setisFollowing] = useState(following);

  const [follow, setFollow] = useState(following ? "Unfollow" : "follow");
  // handling like event
  // db operations involved:
  // removing song from users liked song array
  // updating no of likes in song document
  const handleClick = () => {
    //unfollowing artist
    if (isFollowing) {
      setisFollowing(false);
      setnoFollowers(noFollowers - 1);
      setFollow("follow");
      db.collection("user")
        .doc(cookie.get("uid"))
        .update({
          following: firebase.firestore.FieldValue.arrayRemove(artist.id),
        });
      db.collection("artist")
        .doc(artist.id)
        .update({
          no_of_followers: firebase.firestore.FieldValue.increment(-1),
        });
    } else {
      setisFollowing(true);
      setnoFollowers(noFollowers + 1);
      setFollow("unfollow");
      db.collection("user")
        .doc(cookie.get("uid"))
        .update({
          following: firebase.firestore.FieldValue.arrayUnion(artist.id),
        });
      db.collection("artist")
        .doc(artist.id)
        .update({
          no_of_followers: firebase.firestore.FieldValue.increment(1),
        });
    }
  };
  console.log(artist);
  return (
    <>
      <Heading>{artist.name}</Heading>
      <div
        style={{
          width: "100%",
          height: "68vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "2rem",
        }}
      >
        <Grid
          h={["35vh", "45vh", "45vh"]}
          w="full"
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={1}
          rounded="md"
        >
          <GridItem rowSpan={5} colSpan={3}>
            <Image
              src={artist.profile_picture}
              alt="artist image"
              objectFit="cover"
              boxSize={["35vh", "45vh", "45vh"]}
              borderRadius="30%"
              fallbackSrc="https://wallpaperaccess.com/full/2374217.png"
            />
          </GridItem>
          <VStack>
            <StatGroup>
              <Stat>
                <StatLabel>Number of Followers</StatLabel>
                <StatNumber>{noFollowers}</StatNumber>
              </Stat>
            </StatGroup>
            <Text>{artist.self_produced}</Text>
            <button onClick={handleClick}>{follow}</button>
            {Object.keys(albums).map((idx) => {
              return (
                <div key={idx}>
                  <NextLink href={"/album/" + albums[idx].id} passHref>
                    <Link
                      _hover={{ textDecor: "none" }}
                      _focus={{ boxShadow: "none" }}
                    >
                      <Text key={idx}>{albums[idx].name}</Text>
                    </Link>
                  </NextLink>
                </div>
              );
            })}
          </VStack>
        </Grid>
      </div>
    </>
  );
}
export default withProtected(Artistdetails);

export async function getServerSideProps(context) {
  const { params, req } = context;
  let artist = null;
  let doesnotexists = false;
  let albums_obj = null;
  await firebase
    .firestore()
    .collection("artist")
    .doc(params.artistid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        artist = new Object();
        albums_obj = doc.data().albums;
        artist.name = doc.data().name;
        // artist.console.log(doc.data());
        // artist.push(doc.data().name);
        artist.id = doc.id;
        artist.no_of_followers = doc.data().no_of_followers;
        artist.self_produced = doc.data().self_produced;
        artist.profile_picture = doc.data().profile_picture;

        if (req.cookies.typeOfUser == "Producer") {
          artist.email = doc.data().email;
          artist.previous_month_streams = doc.data().previous_month_streams;
          artist.total_streams = doc.data().total_streams;
        }
      } else {
        doesnotexists = true;
      }
    });
  if (doesnotexists) {
    return { notFound: true };
  }

  let following = false;
  await firebase
    .firestore()
    .collection("user")
    .doc(req.cookies.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        following = doc.data().following?.includes(params.artistid);
      } else {
      }
    });

  const albums = [];
  // getting albums
  for (let i = 0; i < albums_obj.length; i++) {
    const db = await albums_obj[i].get().then((doc) => {
      if (doc.exists) {
        const al = new Object();
        al.name = doc.data().name;
        al.id = doc.id;
        albums.push(al);
      }
    });
  }
  console.log(albums);

  return { props: { artist, following, albums } };
}
