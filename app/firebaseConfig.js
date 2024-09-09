// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAt0Cb9wDU4ZMQBpeKYfKaTGHeP9B_fbwE",
  authDomain: "flashcards-b571a.firebaseapp.com",
  projectId: "flashcards-b571a",
  storageBucket: "flashcards-b571a.appspot.com",
  messagingSenderId: "439220971734",
  appId: "1:439220971734:web:7b7343038645e560274177",
  measurementId: "G-XR33GDB2Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
export {auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut}