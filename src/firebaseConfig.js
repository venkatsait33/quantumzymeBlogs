// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZD-aBnkLn4lW_1qsOrADlfU9Vz4Sv3I",
  authDomain: "quatzimeblogs.firebaseapp.com",
  projectId: "quatzimeblogs",
  storageBucket: "quatzimeblogs.appspot.com",
  messagingSenderId: "371769603902",
  appId: "1:371769603902:web:484043a2cb47062979de6f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
