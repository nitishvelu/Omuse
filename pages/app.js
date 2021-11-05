import React from "react";
import CheckUser from "../components/cloudFirestore/CreateUser";
import { withProtected } from "../src/hook/route";
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

// options = {};

function App({ auth }) {
  const { user, logout } = auth;
  return (
   <>
   appp
   <CheckUser/>
   </>
  );
}
export default withProtected(App);
