// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5Q8-E-efCYwjnT0qr2YxxIjiKG_oP49k",
    authDomain: "gs-inc-attorneys.firebaseapp.com",
    projectId: "gs-inc-attorneys",
    storageBucket: "gs-inc-attorneys.firebasestorage.app",
    messagingSenderId: "40160765188",
    appId: "1:40160765188:web:8706caadb9cc4e76f65c51",
    measurementId: "G-9PXW23DEFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);