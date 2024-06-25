import React, { useEffect, useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

function Auth() {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')


    // to check if user signed in  /// when you change the state ... you will se .. user logged in .. even if you refresh the page
    // if you logged out and change the state like email .... it logs undifeind ... no currentuser logged in
    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            // console.log(auth?.currentUser.email)

        }
        catch (err) {
            console.log(err.message)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            // we can access user photo
            // console.log(auth?.currentUser?.photoURL)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        }
        catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your email' />
            <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' />
            <button onClick={signIn}>Sign in</button>

            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Auth