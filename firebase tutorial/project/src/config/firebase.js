// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBn0UBvc5Gme0rDE8RIO-sfrl1w4nr9i8",
    authDomain: "react-tutorial-ef529.firebaseapp.com",
    projectId: "react-tutorial-ef529",
    storageBucket: "react-tutorial-ef529.appspot.com",
    messagingSenderId: "15207945236",
    appId: "1:15207945236:web:49144c54b7e13c01b4c301"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// we use this variable 
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)