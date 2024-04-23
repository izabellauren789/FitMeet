// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvoJ43VoqZHz5Oau3kJlZC4J0RJmLMIqg",
  authDomain: "fitmeet-2dc44.firebaseapp.com",
  projectId: "fitmeet-2dc44",
  storageBucket: "fitmeet-2dc44.appspot.com",
  messagingSenderId: "607169128162",
  appId: "1:607169128162:web:a5cd0586271fd46f6d60bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };