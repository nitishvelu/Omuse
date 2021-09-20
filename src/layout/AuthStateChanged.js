import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import useAuth from '../hook/auth';


export default function AuthStateChanged({children}) {
    const {setUser}=useAuth();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        });

    },[]);
    if(loading){
        return(<div>loading....</div>)
    }
    return children;
}
