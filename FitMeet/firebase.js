// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM8_ifUSQ0E8QKl1pUQlT0mubrp3L1s2M",
  authDomain: "fitmeet-c7e3a.firebaseapp.com",
  projectId: "fitmeet-c7e3a",
  storageBucket: "fitmeet-c7e3a.appspot.com",
  messagingSenderId: "306301857387",
  appId: "1:306301857387:web:a71117c05efa291b7bcb2e",
  measurementId: "G-21ZT94WXEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = app.firestore();
const auth = getAuth(app);

export { auth, db };
const analytics = getAnalytics(app);