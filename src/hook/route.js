import { useRouter } from 'next/router';
import React from 'react'
import useAuth from './auth'

export  function withPublic(Component) {
    return function WithPublic(props){
        const auth=useAuth();
        const router=useRouter();
        
        if(auth.user){
            router.replace("/");
            return<h1>loading......</h1>
        }
        return<Component auth={auth}{...props}/>
    }
}
