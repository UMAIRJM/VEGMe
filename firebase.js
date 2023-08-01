// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtLkUzl01FcNjNjssg6ra7VOPx2DTXLTY",
  authDomain: "vegme-86731.firebaseapp.com",
  projectId: "vegme-86731",
  storageBucket: "vegme-86731.appspot.com",
  messagingSenderId: "626492065463",
  appId: "1:626492065463:web:be8dac515efed019a22f32",
  measurementId: "G-NGSXY70JGW",
  databaseURL: "https://vegme-86731-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {app , auth};