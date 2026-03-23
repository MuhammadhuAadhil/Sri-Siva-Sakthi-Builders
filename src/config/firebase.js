import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB3WUX3M-r6ZQbhFHMqlvEAaLEtyw2ajUI",
  authDomain: "blog-app-7b7dc.firebaseapp.com",
  projectId: "blog-app-7b7dc",
  storageBucket: "blog-app-7b7dc.firebasestorage.app",
  messagingSenderId: "423442600282",
  appId: "1:423442600282:web:8c0e3942670c8557fca363",
  measurementId: "G-03N8H48L9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)

export default auth