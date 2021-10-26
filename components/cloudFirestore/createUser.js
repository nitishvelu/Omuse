import firebase from "firebase/app";
import "firebase/firestore";
import { withProtected } from "../../src/hook/route";
import React, { useEffect } from "react";

const checkUserExistence = ({ auth }) => {
  const { user, logout } = auth;
  const photo = user?.photoURL;
  useEffect(() => {
    showData();
  }, []);

  const showData = () => {
    var db = firebase.firestore();
    var docRef = db.collection("user").doc(user.uid);
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
  };
  return null;
};

// checkUserExistence();
export default withProtected(checkUserExistence);
