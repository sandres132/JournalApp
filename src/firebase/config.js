// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-bgiu0OvCWkk7bh9oq7on7lPyTNULlIg",
  authDomain: "react-cursos-8f36a.firebaseapp.com",
  projectId: "react-cursos-8f36a",
  storageBucket: "react-cursos-8f36a.firebasestorage.app",
  messagingSenderId: "756962245092",
  appId: "1:756962245092:web:b53f8bd13c4d0303ea2ff1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);