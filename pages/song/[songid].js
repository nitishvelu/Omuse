import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  Box,
  Button,
  Text,
  VStack,
  IconButton,
  Heading,
} from "@chakra-ui/layout";
import {
  HStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import cookie from "js-cookie";
import { useState } from "react";
import router from "next/router";
import Song from "../../components/Songs";

// import { FiHeart } from "react-icons/fi";
function Songdetails({ song_obj, liked }) {
  const db = firebase.firestore();
  const [noLikes, setNoLikes] = useState(song_obj.no_of_likes);
  const [isLiked, setIsLiked] = useState(liked);

  const [likeUnlike, setlikeUnlike] = useState(liked ? "unlike" : "like");
  // handling like event
  // db operations involved:
  // removing song from users liked song array
  // updating no of likes in song document
  const handleClick = () => {
    //unliking song
    if (isLiked) {
      setIsLiked(false);
      setNoLikes(noLikes - 1);
      setlikeUnlike("like");
      db.collection("user")
        .doc(cookie.get("uid"))
        .update({
          liked_songs: firebase.firestore.FieldValue.arrayRemove(song_obj.id),
        });
      db.collection("song")
        .doc(song_obj.id)
        .update({
          no_of_likes: firebase.firestore.FieldValue.increment(-1),
        });
    }
    //liking song
    else {
      setIsLiked(true);
      setNoLikes(noLikes + 1);
      setlikeUnlike("unlike");
      db.collection("user")
        .doc(cookie.get("uid"))
        .update({
          liked_songs: firebase.firestore.FieldValue.arrayUnion(song_obj.id),
        });
      db.collection("song")
        .doc(song_obj.id)
        .update({
          no_of_likes: firebase.firestore.FieldValue.increment(1),
        });
    }
  };
  return (
    <>
      <HStack>
        // needs styling
        <VStack>
          <Heading> {song_obj.name}</Heading>
          <Image src={song_obj.img} objectFit="cover" boxSize="400px" />
          <StatGroup>
            <Stat>
              <StatLabel>Total Number of Streams</StatLabel>
              <StatNumber>{song_obj.no_of_streams}</StatNumber>
            </Stat>
          </StatGroup>
          <Text>{song_obj.album}</Text>
          <Text>{song_obj.language}</Text>
          <Text>{song_obj.year}</Text>

          {console.log(song_obj)}
        </VStack>
        {/* <CloseButton size="lg" onClick={() => router.back()} /> */}
      </HStack>
    </>
  );
}
export default withProtected(Songdetails);

export async function getServerSideProps(context) {
  const { params, req } = context;
  let artist = null;
  var album = null;
  var song_obj = null;

  const ref = await firebase
    .firestore()
    .collection("song")
    .doc(params["songid"])
    .get()
    .then((doc) => {
      if (doc.exists) {
        song_obj = new Object();
        song_obj.name = doc.data().name;
        song_obj.genre = doc.data().genre;
        song_obj.year = doc.data().year;
        song_obj.no_of_likes = doc.data().no_of_likes;
        song_obj.no_of_streams = doc.data().no_of_streams;
        song_obj.language = doc.data().language;
        song_obj.ref = doc.data().cloud_reference;
        song_obj.img = doc.data().art;
        album = doc.data().album;
      } else {
      }
    });

  // getting albums
  const db1 = await album.get().then((doc) => {
    if (doc.exists) {
      song_obj.album = doc.data().name;
      artist = doc.data().artist;
    }
  });

  // getting artists
  const db2 = await artist.get().then((doc) => {
    if (doc.exists) {
      song_obj.artist_name = doc.data().name;
      song_obj.artist_id = doc.id;
    }
  });

  return { props: { song_obj } };
}
