import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { Box, Button, Text, VStack, IconButton } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import cookie from "js-cookie";
// import { FiHeart } from "react-icons/fi";

function Songdetails({ song }) {
  return (
    <>
      <HStack>
        <VStack>
          {song.map((txt, i) => (
            <>
              <Text fontWeight="bold" fontSize="xl" key={i}>
                {txt}
              </Text>
            </>
          ))}
          <button
            onClick={function (e) {
              const db = firebase.firestore();
              db.collection("user")
                .doc(cookie.get("uid"))
                .update({
                  liked_songs: firebase.firestore.FieldValue.arrayUnion(
                    song[0]
                  ),
                });
            }}
          >
            like
          </button>
        </VStack>
        <CloseButton size="lg" />
      </HStack>
    </>
  );
}
export default withProtected(Songdetails);

export async function getServerSideProps(context) {
  const { params, req } = context;
  let song = [];
  let doesnotexists = false;
  await firebase
    .firestore()
    .collection("song")
    .doc(params.songid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        song.push(doc.id);
        song.push(doc.data().name);
        song.push(doc.data().year);
        song.push(doc.data().language);
        song.push(doc.data().genre);
      } else {
        doesnotexists = true;
      }
    });
  if (doesnotexists) {
    return { notFound: true };
  }

  return { props: { song } };
}
