import { Heading } from "@chakra-ui/react";
import React from "react";
import { withProtected } from "../src/hook/route";
import firebase from "firebase/app";
import "firebase/firestore";

const getData = () => {
  var db = firebase.firestore();
  //       var userRef = db.collection("user").doc(user?.uid);
  db.collection("song")
    .where("genre", "==", "r&b")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        console.log(doc.data());
      });
    });
};

function playlists() {
  getData();
  return (
    <>
      <Heading>test</Heading>
    </>
  );
}
export default withProtected(playlists);
