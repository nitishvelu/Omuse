import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { withArtist } from "../src/hook/route";
import { Input, VStack, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";

var artist = null;
var album = null;
var songs = [];
var alldone = false;
var num_uploaded = 0;
var db = firebase.firestore();

function writeSongs() {
  for (let i = 0; i < songs.length; i++) {
    const song = db.collection("song").doc();
    song.set({
      name: songs[i].name,
      album: songs[i].album,
      cloud_reference: songs[i].cloud_reference,
      genre: songs[i].genre,
      language: songs[i].language,
      no_of_likes: 0,
      no_of_streams: 0,
      year: songs[i].year,
    });
    album.update({
      songs: firebase.firestore.FieldValue.arrayUnion(song),
    });
    album.update({
      cover_art: songs[0].art,
    });

    db.collection("artist")
      .doc(artist.id)
      .update({
        albums: firebase.firestore.FieldValue.arrayUnion(album),
      });
  }
  console.log("sucessful !");
  console.log(songs);
  document.getElementById("root").innerHTML =
    "Success! your album has been uploaded !";
}

function changeHandler(event) {
  const jsmediatags = window.jsmediatags;
  var storageRef = firebase.storage().ref();
  var size = event.target.files.length;
  document.getElementById("loading").style.display = "block";
  for (let j = 0; j < event.target.files.length; j++) {
    let song = new Object();
    song.album = album;
    songs.push(song);
    const file = event.target.files[j];

    const uploadSong = (j) => {
      var content = file;
      content.src = file.src;

      var metadata = {
        contentType: "audio",
      };

      var uploadTask = storageRef
        .child(document.getElementById("album_name").value + "/" + file.name)
        .put(file, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById(j + "").value = progress;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log("Unauthorised access");
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((token) => {
            songs[j].cloud_reference = token;
            num_uploaded += 1;
            console.log("uploaded song");

            if (num_uploaded == size) {
              console.log("done");
              document.getElementById("loading").style.display = "none";
              document.getElementById("submit").style.display = "block";
              alldone = true;
            }
          });
        }
      );
    };

    jsmediatags.read(file, {
      onSuccess: function (tag) {
        var picture = tag.tags.picture; // create reference to track art
        var base64String = "";
        for (let i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }

        var imageUri =
          "data:" + picture.format + ";base64," + window.btoa(base64String);

        const container = document.createElement("div");
        var art = document.createElement("img");
        art.src = imageUri;
        art.style.width = "10vh";
        songs[j].art = imageUri;
        container.appendChild(art);

        var name = document.createElement("LABEL");
        name.innerHTML = "Name: ";
        var input = document.createElement("input");
        input.style.color = "black";
        input.type = "text";
        input.value = tag.tags.title;
        songs[j].name = input.value;
        input.addEventListener("change", (e) => {
          songs[j].name = e.target.value;
        });
        input.className = "css-class-name"; // set the CSS class
        container.appendChild(name);
        container.appendChild(input); // put it into the DOM

        var genre = document.createElement("LABEL");
        genre.innerHTML = "Genre: ";
        var input = document.createElement("input");
        input.style.color = "black";
        input.type = "text";
        input.value = tag.tags.genre;
        songs[j].genre = input.value.split("/");
        input.addEventListener("change", (e) => {
          songs[j].genre = e.target.value;
        });
        input.className = "css-class-name"; // set the CSS class
        container.appendChild(genre);
        container.appendChild(input);

        var year = document.createElement("LABEL");
        year.innerHTML = "Year: ";
        var input = document.createElement("input");
        input.style.color = "black";
        input.type = "text";
        input.value = tag.tags.year;
        songs[j].year = input.value;
        input.addEventListener("change", (e) => {
          songs[j].year = e.target.value;
        });
        input.className = "css-class-name"; // set the CSS class
        container.appendChild(year);
        container.appendChild(input);

        var lang = document.getElementById("Language");
        songs[j].language = lang.value;
        lang.addEventListener("change", (e) => {
          songs[j].language = e.target.value;
        });

        var bar = document.createElement("progress");
        bar.id = j;
        bar.max = 100;

        songs[j].no_of_likes = 0;
        songs[j].no_of_streams = 0;

        container.appendChild(bar);
        document.getElementById("container").appendChild(container);

        uploadSong(j);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  }
  console.log(songs);
}

function uploadAlbum() {
  document.getElementById("container").style.display = "block";

  album = db.collection("album").doc();
  album.set({
    name: document.getElementById("album_name").value,
    artist: db.doc("artist/" + artist.id),
    no_of_streams: 0,
    songs: [],
  });
}

function invalid() {
  console.log("invalid artist id try again !");
}

function fetchArtist(id) {
  firebase
    .firestore()
    .collection("artist")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        artist = new Object();
        artist.id = id;
        artist.name = doc.data().name;
        artist.albums = doc.data().albums;
        uploadAlbum();
      } else {
        invalid();
      }
    });
}

function createAlbum() {
  let id = document.getElementById("art_id").value;
  fetchArtist(id);
}

function Upload({ auth }) {
  const { user, logout } = auth;
  const photo = user?.photoURL;

  var jQueryScript = document.createElement("script");
  jQueryScript.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.js"
  );

  document.head.appendChild(jQueryScript);

  return (
    <div id="root">
      {/* used html input chakra causing error */}
      <Input
        id="art_id"
        placeholder="Enter Artist ID"
        size="md"
        required
        variant="flushed"
      />
      <Input
        id="album_name"
        placeholder="Enter Album name"
        size="md"
        required
        variant="flushed"
      />

      <Input
        value="Create Album"
        variant="filled"
        size="xs"
        type="button"
        onClick={createAlbum}
      />
      <VStack
        id="container"
        style={{ display: "none", overflow: "scroll", height: "60vh" }}
      >
        <Input
          id="Language"
          placeholder="Enter Language"
          size="md"
          required
          variant="flushed"
        />
        <Input
          type="file"
          multiple
          accept="audio/*"
          id="input"
          onChange={changeHandler}
          variant="flushed"
        />
      </VStack>
      <Button
        isLoading
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="start"
        loadingText="loading"
        id="loading"
        size="md"
        display="none"
      >
        Submit
      </Button>
      <Button
        id="submit"
        display="none"
        colorScheme="teal"
        variant="outline"
        display="none"
        onClick={writeSongs}
      >
        Submit
      </Button>
    </div>
  );
}

// checkUserExistence();
export default withArtist(Upload);
