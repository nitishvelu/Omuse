import React from 'react'
import { withProtected } from '../src/hook/route'
import firebase from "firebase/app";
import "firebase/firestore";
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';
import { useColorMode,useColorModeValue } from "@chakra-ui/color-mode";
import { Box,Button,Text,VStack } from "@chakra-ui/layout";

function Liked({songids}) {
 
    return (
        <>
        <VStack>
      {songids.map(txt => <Box key={txt}>{txt}</Box>)}
      </VStack>
    </>
    )
}
export default withProtected(Liked)

export async function getServerSideProps({req}) {
  let songids=[];
  const ref = await firebase.firestore()
      .collection("user").doc(req.cookies.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
            // songs.push(doc.data().email);
            doc.data().liked_songs.forEach( (element) => {
              // console.log(1111111);
              songids.push(element);
             
              
            });
            // console.log(songs)
        }else{
        }})
  console.log(songids);
  return { props: {songids} };
}