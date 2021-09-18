import React from 'react'
import useAuth from '../src/hook/auth'

export default function Login() {
    const{user,loginWithGoogle,error} =useAuth();
    return (
        <div>
            {error &&<h1>{error}</h1>}
            <button onClick={loginWithGoogle}>google</button>
            <h1>{user?.uid}</h1>
            {console.log(user.photoURL)}

        </div>
    )
}
