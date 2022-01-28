// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1HjK93dnRT29MiJaLI6snBKKyzG8lVWM",
  authDomain: "secret-42e39.firebaseapp.com",
  projectId: "secret-42e39",
  storageBucket: "secret-42e39.appspot.com",
  messagingSenderId: "661938613992",
  appId: "1:661938613992:web:be867b8a70a7b8e73e235d",
  measurementId: "G-YJHZZXL2RY",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const twitterAuth = new TwitterAuthProvider();
