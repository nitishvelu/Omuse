import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { withProtected } from "../../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";
import { Box, Button, Text, VStack } from "@chakra-ui/layout";

function Artistdetails({ artist }) {
  return (
    <>
      <VStack>
        {artist.map((txt) => (
          <Box key={txt}>{txt}</Box>
        ))}
      </VStack>
    </>
  );
}
export default withProtected(Artistdetails);

export async function getServerSideProps(context) {
  const { params, req } = context;
  let artist = [];
  let doesnotexists = false;
  await firebase
    .firestore()
    .collection("artist")
    .doc(params.artistid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        artist.push(doc.data().name);
        if (req.cookies.typeOfUser == "Producer") artist.push(doc.data().email);
      } else {
        doesnotexists = true;
      }
    });
  if (doesnotexists) {
    return { notFound: true };
  }

  return { props: { artist } };
}
