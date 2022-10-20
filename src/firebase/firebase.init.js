// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFrjWXqz6ydkBbo1u2lwZKSLlYGVTq6dQ",
    authDomain: "email-pass-practice-auth.firebaseapp.com",
    projectId: "email-pass-practice-auth",
    storageBucket: "email-pass-practice-auth.appspot.com",
    messagingSenderId: "1078026464925",
    appId: "1:1078026464925:web:6c849e36fed9c4ea996e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;