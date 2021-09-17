import firebase from "firebase/app";
import "firebase/auth";
const AuthService={
    loginWithGoogle:async()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().singInWithPopup(provider);

    }
}