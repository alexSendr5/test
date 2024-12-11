import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQPK1HLdY8jOyVkQ26Hiw9DhEEiHqA_n8",
  authDomain: "test-bae16.firebaseapp.com",
  projectId: "test-bae16",
  storageBucket: "test-bae16.firebasestorage.app",
  messagingSenderId: "493847015537",
  appId: "1:493847015537:web:7b77d9df0b5930cea5ebd0",
  measurementId: "G-0CEVXYXN2C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db