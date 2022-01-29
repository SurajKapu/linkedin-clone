import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBm9hpmVylP8xdsy5YW7HmBnB-kCBvF3iU",
  authDomain: "linkedin-clone-e68cb.firebaseapp.com",
  projectId: "linkedin-clone-e68cb",
  storageBucket: "linkedin-clone-e68cb.appspot.com",
  messagingSenderId: "193834590111",
  appId: "1:193834590111:web:5917b8aad033538f5667aa",
  measurementId: "G-NGV60EYND0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, storage };
export default db;
