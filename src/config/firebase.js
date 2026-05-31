import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // or database
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALnK3nCO-tRq82ZBWv84np5J9NdTZ7EuU",
  authDomain: "construction-sss.firebaseapp.com",
  projectId: "construction-sss",
  storageBucket: "construction-sss.firebasestorage.app",
  messagingSenderId: "724157881531",
  appId: "1:724157881531:web:1625b3e6dc434e11031d9e",
  measurementId: "G-D69PJ2XXSS"
};

// ✅ Prevent duplicate app error
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
