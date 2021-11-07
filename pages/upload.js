import firebase from "firebase/app";
import "firebase/firestore";
import { withArtist } from "../src/hook/route";
import React, { useEffect } from "react";

function changeHandler(event) {
  const jsmediatags = window.jsmediatags;
  const file = event.target.files[0];

  jsmediatags.read(file, {
    onSuccess: function (tag) {
      console.log(tag.tags);
      var picture = tag.tags.picture; // create reference to track art
      var base64String = "";
      for (var i = 0; i < picture.data.length; i++) {
        base64String += String.fromCharCode(picture.data[i]);
      }
      var imageUri =
        "data:" + picture.format + ";base64," + window.btoa(base64String);

      const data = tag.tags.picture.data;

      // Output media tags
      document.querySelector("#song-detail").innerHTML =
        tag.tags.title +
        "<br />" +
        tag.tags.artist +
        "<br />" +
        tag.tags.album +
        "<br />" +
        tag.tags.genre +
        "<br />" +
        tag.tags.year;

      var content = document.getElementById("img");
      content.src = imageUri;
    },
    onError: function (error) {
      console.log(error);
    },
  });
}

function Upload({ auth }){
  const { user, logout } = auth;
  const photo = user?.photoURL;

  var jQueryScript = document.createElement("script");
  jQueryScript.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.js"
  );

  document.head.appendChild(jQueryScript);

  return (
    <div>
      <input type="file" id="input" onChange={changeHandler} />
      <div id="song-detail"></div>
      <img id="img" />
      <div id="cover" style={{ display: "block", width: "100%" }}></div>
    </div>
  );
};

// checkUserExistence();
export default withArtist(Upload);
