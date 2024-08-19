// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD--er9Rgg0OJfrTMlq40pk346dXoB3CEk",
  authDomain: "chat-support-b1325.firebaseapp.com",
  projectId: "chat-support-b1325",
  storageBucket: "chat-support-b1325.appspot.com",
  messagingSenderId: "358308906705",
  appId: "1:358308906705:web:2829941754ca82b35267f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
export {auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword}