import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCANT3mU_9XWB4LcLKp6tkNHDz4-jKsenU",
  authDomain: "chitchat-e739e.firebaseapp.com",
  projectId: "chitchat-e739e",
  storageBucket: "chitchat-e739e.appspot.com",
  messagingSenderId: "383585894908",
  appId: "1:383585894908:web:eee9869efd0394db45b279"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
