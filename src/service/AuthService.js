import { async } from "@firebase/util";
import firebase from "firebase/app";
import "firebase/auth";
export const AuthService = {
  loginWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCredentials = await firebase.auth().signInWithPopup(provider);
      console.log(userCredentials.user);
      return {
        user: userCredentials.user,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  },
  logout: async () => {
    await firebase.auth().signOut();
  },
};
