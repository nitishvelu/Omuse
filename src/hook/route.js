import { useRouter } from 'next/router';
import React from 'react'
import useAuth from './auth'
import cookie from "js-cookie";


export  function withPublic(Component) {
    return function WithPublic(props){
        const auth=useAuth();
        const router=useRouter();
        
        if(auth.user){
            router.replace("/app");
            return<h1>loading......</h1>
        }
        return<Component auth={auth}{...props}/>
    }
}

export  function withProtected(Component) {
    return function WithProtected(props){
        const auth=useAuth();
        const router=useRouter();
        
        if(!auth.user){
            router.replace("/");
            return<h1>loading......</h1>
        }
        return<Component auth={auth}{...props}/>
    }
}
export  function withArtist(Component) {
    return function WithArtist(props){
        const auth=useAuth();
        const router=useRouter();
        
        if(!auth.user || cookie.get("typeOfUser")!="Artist"){
            router.replace("/");
            return<h1>loading......</h1>
        }
        return<Component auth={auth}{...props}/>
    }
}