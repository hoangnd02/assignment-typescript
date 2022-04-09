// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjm6uplyOTqLRz8YYP25wXs3d1ij_gqKM",
  authDomain: "node-spr2022.firebaseapp.com",
  projectId: "node-spr2022",
  storageBucket: "node-spr2022.appspot.com",
  messagingSenderId: "331538128147",
  appId: "1:331538128147:web:3e516abb2e320efbea8ee6",
  measurementId: "G-GYSLGRCRZC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();