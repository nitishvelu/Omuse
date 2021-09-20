import { useRouter } from 'next/router';
import React from 'react'
import useAuth from './auth'

export  function withPublic(Component) {
    return function WithPublic(props){
        const auth=useAuth();
        const router=useRouter();
        
        if(auth.user){
            router.replace("/");
        }
        return<Component auth={auth}{...props}/>
    }
}
