// npm install firebaseui firebase @firebase/database


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUI8tQqbcjHefHMehtG12irPOAMuUT3WU",
    authDomain: "flygift-e72e9.firebaseapp.com",
    databaseURL: "https://flygift-e72e9-default-rtdb.firebaseio.com",
    projectId: "flygift-e72e9",
    storageBucket: "flygift-e72e9.appspot.com",
    messagingSenderId: "1074501760526",
    appId: "1:1074501760526:web:81ce60ed5aa58ec86aae5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);