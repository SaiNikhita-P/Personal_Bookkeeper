// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDWt_Pii1-Yt5pFWNKxBuJ28p5x-t5upbY",
  authDomain: "finance-manager-513aa.firebaseapp.com",
  projectId: "finance-manager-513aa",
  storageBucket: "finance-manager-513aa.appspot.com",
  messagingSenderId: "527971192136",
  appId: "1:527971192136:web:89394cc99c147ab221b77d",
  measurementId: "G-1GBWWE4RF7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };