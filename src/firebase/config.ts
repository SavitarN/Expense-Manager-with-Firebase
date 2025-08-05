import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSMrbpGO3JeqVtM-H-hHca3ssXGAzc1EQ",
  authDomain: "expense-tracker-16dcb.firebaseapp.com",
  projectId: "expense-tracker-16dcb",
  storageBucket: "expense-tracker-16dcb.appspot.com",
  messagingSenderId: "88865406358",
  appId: "1:88865406358:web:1e435a3cafed50b75371b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
