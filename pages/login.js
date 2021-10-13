import React from 'react'
import { withPublic } from '../src/hook/route';
import Link from 'next/link';

function Login({auth}) {
    const{user,loginWithGoogle,error} =auth;
    return (
        <div>
            {error &&<h1>{error}</h1>}
            <button onClick={loginWithGoogle}>google</button>
            <h1>{user?.uid}</h1>
            {console.log(user)}
            <button><Link href="/"><a>home</a></Link></button>
        </div>
    )
}
export default withPublic(Login);