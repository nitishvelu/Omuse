import firebase from "firebase/app";
import "firebase/firestore";
import { withProtected } from "../../src/hook/route";
import React, { useEffect, useState } from "react";
import useAuth from "../../src/hook/auth";
import cookie from "js-cookie";

export default function CreateUser(){
  const auth=useAuth();
  const { user, logout } = auth;
  const photo = user?.photoURL;
  useEffect(() => {
    var db = firebase.firestore();
    var docRef = db.collection("user").doc(user?.uid);
    console.log(user);


    docRef
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

  },[]);
  return null;
};


