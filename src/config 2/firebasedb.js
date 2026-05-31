import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc8GamvUKZbUgEXLErb0yRV5FOuq8FWs0",
  authDomain: "builders-sss.firebaseapp.com",
  projectId: "builders-sss",
  storageBucket: "builders-sss.firebasestorage.app",
  messagingSenderId: "716062187707",
  appId: "1:716062187707:web:95c3bfeb9dea69e504099e",
  measurementId: "G-M30NT3MRM0"
};

// ✅ Give unique name for second app
const app2 = getApps().find(app => app.name === "SECOND_APP")
  ? getApp("SECOND_APP")
  : initializeApp(firebaseConfig, "SECOND_APP");

// ✅ Firestore
const db = getFirestore(app2);

export { db };