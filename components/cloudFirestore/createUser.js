import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const write = () => {
  //   const { user, logout } = auth;
  //   const photo = user?.photoURL;
  //   console.log(user);
  const showData = () => {
    var db = firebase.firestore();
    db.collection("user")
      .doc("dXHtoYCZaUdKl6OCjWcQ")
      .onSnapshot(function (doc) {
        console.log(doc);
      });
    firebase.storage;
  };
  return <button onClick={showData}>show data</button>;
};

export default write;
