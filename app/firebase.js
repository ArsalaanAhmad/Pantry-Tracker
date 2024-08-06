// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDyHXTRLxuFywXgH3vDX0G2RvQzfCwrVic",
  authDomain: "inventory-management-app-25dbc.firebaseapp.com",
  projectId: "inventory-management-app-25dbc",
  storageBucket: "inventory-management-app-25dbc.appspot.com",
  messagingSenderId: "960648025677",
  appId: "1:960648025677:web:2e7a3679471fbbf5a26e04",
  measurementId: "G-B5K01M3E3H"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore } ;
export { analytics };
export { auth };