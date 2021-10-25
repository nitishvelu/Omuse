import React from 'react'
import { withProtected } from '../src/hook/route'

function App({auth}) {
    const{user,logout}=auth;
    const photo=user?.photoURL;
    return (
        <div>
            <h1>make navbar here</h1>
            <br></br>
            <h1>{user?.email}</h1>
            <br></br>
            <h1>{user?.uid}</h1>
            <br></br>
            <img src={photo}/>
            <br></br>
            <h1>{user?.displayName}</h1>
            <br></br>
            <button onClick={logout}>Logout</button>
           
        </div>
    )
}
export default withProtected(App);