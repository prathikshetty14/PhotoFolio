import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUd3CCU5Z03fkhpXo1mDZymsQw_6efev8",
  authDomain: "photofolio-6d056.firebaseapp.com",
  projectId: "photofolio-6d056",
  storageBucket: "photofolio-6d056.appspot.com",
  messagingSenderId: "8532597691",
  appId: "1:8532597691:web:93cf1333a04d365d28429e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
