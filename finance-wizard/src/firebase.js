// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC13caek8JrJK25FEC9oKtkAELfY4lOg4I",
  authDomain: "finance-wizard-166ab.firebaseapp.com",
  projectId: "finance-wizard-166ab",
  storageBucket: "finance-wizard-166ab.appspot.com",
  messagingSenderId: "664770743170",
  appId: "1:664770743170:web:a0d0bca618390c37cfdd9b",
  measurementId: "G-SWPJD4N80M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc, analytics };
