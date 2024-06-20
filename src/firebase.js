// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authenticationpractice-9fc3b.firebaseapp.com",
  projectId: "authenticationpractice-9fc3b",
  storageBucket: "authenticationpractice-9fc3b.appspot.com",
  messagingSenderId: "1052866085219",
  appId: "1:1052866085219:web:a945ffc0b47b09b7439356",
  measurementId: "G-TW0XPJHBGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);