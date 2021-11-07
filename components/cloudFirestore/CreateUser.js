import firebase from "firebase/app";
import "firebase/firestore";
import { withProtected } from "../../src/hook/route";
import React, { useEffect, useState } from "react";
import useAuth from "../../src/hook/auth";
import cookie from "js-cookie";

export default function CreateUser(){
  const auth=useAuth();
  const { user } = auth;
  const photo = user?.photoURL;
  useEffect(() => {
    const getData=()=>{
    var db = firebase.firestore();
    var userRef = db.collection("user").doc(user?.uid);
    var artistRef = db.collection("artist").doc(user?.uid);
    var producerRef = db.collection("producer").doc(user?.uid);

    console.log(user);
    cookie.set("uid",user.uid,{expires:30});
    cookie.set("name",user.displayName,{expires:30});


    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("user exists,  data:", doc.data());
        } else {
          //creating the user
          db.collection("user")
            .doc(user.uid)
            .set({
              email: user.email,
              name: user.displayName,
              profile_picture: photo,
            })
            .then(() => {
              console.log("user created");
            })
            .catch((error) => {
              console.error("Error createing user: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

//checking for the type of user [Artist,Producer,User]
      artistRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          cookie.set("typeOfUser","Artist",{expires:30});
        } else {
          producerRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              cookie.set("typeOfUser","Producer",{expires:30});
            } else {
              cookie.set("typeOfUser","User",{expires:30});
            }
          })
          
        }
      })    
    };
      getData();

  },[]);
  return null;
};


