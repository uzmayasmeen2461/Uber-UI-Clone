// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYof6g9txKcLqVVq1K3AP_5HrZhjxWyAU",
  authDomain: "uber-next-clone-22fd8.firebaseapp.com",
  projectId: "uber-next-clone-22fd8",
  storageBucket: "uber-next-clone-22fd8.appspot.com",
  messagingSenderId: "31495793411",
  appId: "1:31495793411:web:285a18c5bf5297a7415736",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
