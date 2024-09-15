// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAz3o2GrSJ9Wp9tYikIddcwVdy4-Di_hXE",
    authDomain: "palanialab1.firebaseapp.com",
    projectId: "palanialab1",
    storageBucket: "palanialab1.appspot.com",
    messagingSenderId: "883296884438",
    appId: "1:883296884438:web:1efeb5d5c258a0244f9b77",
    measurementId: "G-7QDJ8R0XG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
