// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9OcDAYu79XALNcGw0YGM00u8oImOUVVk",
  authDomain: "ideas-para-regalos.firebaseapp.com",
  projectId: "ideas-para-regalos",
  storageBucket: "ideas-para-regalos.appspot.com",
  messagingSenderId: "405311013093",
  appId: "405311013093:web:783204c8de1263ba94940c",
  measurementId: "G-ZYL63L4C42",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
