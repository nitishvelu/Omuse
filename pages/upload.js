import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { withArtist } from "../src/hook/route";
import { Input, VStack, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Wrap, WrapItem, Flex } from "@chakra-ui/react";

var artist = null;
var album = null;
var songs = [];
var num_uploaded = 0;
var db = firebase.firestore();

// genrating random values for # of streams and likes of each song
function generateRandom(min = 1000, max = 1000000) {
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
}

// populating db with all songs and attaching album to the artist
function writeSongs() {
  setTimeout(function () {
    document.getElementById("root").innerHTML =
      "Success! your album has been uploaded !";
  }, 3000);

  for (let i = 0; i < songs.length; i++) {
    const song = db.collection("song").doc();
    song.set({
      name: songs[i].name,
      album: songs[i].album,
      cloud_reference: songs[i].cloud_reference,
      genre: songs[i].genre,
      language: songs[i].language,
      no_of_likes: generateRandom(),
      no_of_streams: generateRandom(),
      year: songs[i].year,
      art: songs[i].art,
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
}

// reading files on state change of file upload
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

      // no metadata for now
      var metadata = {
        contentType: "audio",
      };

      // creating path in storage for album folder -> album_name/ file_name
      var uploadTask = storageRef
        .child(document.getElementById("album_name").value + "/" + file.name)
        .put(file, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById(j + "").value = progress;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              break;
            case firebase.storage.TaskState.RUNNING:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("Unauthorised access");
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              console.log("unknown error occured");
              break;
          }
        },
        // success callback wehn file is uploaded to storage
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((token) => {
            songs[j].cloud_reference = token;
            num_uploaded += 1;
            console.log("uploaded song");

            // checking if all attached files are uploaded to storage
            if (num_uploaded == size) {
              console.log("done");
              document.getElementById("loading").style.display = "none";
              document.getElementById("submit").style.display = "block";
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

        // please add class names and do css here html looks ugly

        // div for each song preview uploaded
        const container = document.createElement("div");

        //song cover art
        var art = document.createElement("img");
        art.src = imageUri;
        art.style.width = "10vh";
        songs[j].art = imageUri;
        container.appendChild(art);

        //song name
        var name = document.createElement("LABEL");
        name.innerHTML = "Name: ";
        var input = document.createElement("input");
        input.type = "text";
        input.value = tag.tags.title;
        songs[j].name = input.value;
        input.addEventListener("change", (e) => {
          songs[j].name = e.target.value;
        });
        input.className = "omuse-input";
        container.appendChild(name);
        container.appendChild(input);

        //genre
        var genre = document.createElement("LABEL");
        genre.innerHTML = "Genre: ";
        var input = document.createElement("input");
        input.type = "text";
        input.value = tag.tags.genre;
        songs[j].genre = input.value;
        input.addEventListener("change", (e) => {
          songs[j].genre = e.target.value;
        });
        input.className = "omuse-input"; // set the CSS class
        container.appendChild(genre);
        container.appendChild(input);

        // language for whoel album
        var lang = document.getElementById("Language");
        songs[j].language = lang.value;
        lang.addEventListener("change", (e) => {
          songs[j].language = e.target.value;
        });

        // year of release of whole album
        var year = document.getElementById("Year");
        songs[j].year = parseInt(year.value);
        year.addEventListener("change", (e) => {
          songs[j].year = parseInt(e.target.value);
        });

        //progress bars for upload
        var bar = document.createElement("progress");
        bar.id = j;
        bar.className = "progress-bar";
        bar.max = 100;

        // putting random val instead uncomment if needed to change
        // songs[j].no_of_likes = 0;
        // songs[j].no_of_streams = 0;

        container.appendChild(bar);
        document.getElementById("container").appendChild(container);

        uploadSong(j);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  }
}

// adds album document to the db
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

// display invalid artist id
function invalid() {
  console.log("invalid artist id try again !");
}

// get artist by id
function createAlbum() {
  let id = document.getElementById("art_id").value;
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

function Upload({ auth }) {
  const { user, logout } = auth;
  const photo = user?.photoURL;

  //adding script tags for jsmediatags cdn
  var jQueryScript = document.createElement("script");
  jQueryScript.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.js"
  );
  document.head.appendChild(jQueryScript);

  return (
    <div id="root">
      {/* used html input chakra causing error */}
      <Wrap>
        <Input
          id="art_id"
          autoComplete="off"
          placeholder="Enter Artist ID"
          size="md"
          required
          variant="filled"
        />
        <Input
          id="album_name"
          placeholder="Enter Album name"
          autoComplete="off"
          size="md"
          required
          variant="filled"
        />
        <Button size="xs" onClick={createAlbum}>
          Create Album
        </Button>
      </Wrap>
      <VStack
        id="container"
        style={{ display: "none", overflow: "scroll", height: "60vh" }}
      >
        <Input
          id="Language"
          autoComplete="off"
          placeholder="Enter Language"
          size="md"
          required
          variant="filled"
        />
        <Input
          id="Year"
          autoComplete="off"
          placeholder="Enter Year"
          size="md"
          required
          variant="filled"
        />
        <Input
          type="file"
          multiple
          accept="audio/*"
          id="input"
          onChange={changeHandler}
          variant="filled"
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
        onClick={writeSongs}
      >
        Submit
      </Button>
    </div>
  );
}

export default withArtist(Upload);
