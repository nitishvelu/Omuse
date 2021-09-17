import firebase from "firebase/app";
import "firebase/auth";
const AuthService={
    loginWithGoogle:async()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            const userCredentials=await firebase.auth().singInWithPopup(provider);
            return{
                user:userCredentials,
            };
        }catch(e){
            return{
                error:e.message,
            };
        }

    }
}