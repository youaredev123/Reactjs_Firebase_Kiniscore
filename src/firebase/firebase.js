// import firebase from "firebase/app";
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-CXbYvDDZxQIrvSY-hzmPGEu5Do0hIz0",
  authDomain: "kiniscorewebapp.firebaseapp.com",
  databaseURL: "https://kiniscorewebapp.firebaseio.com",
  projectId: "kiniscorewebapp",
  storageBucket: "kiniscorewebapp.appspot.com",
  messagingSenderId: "733934374621",
  appId: "1:733934374621:web:ebd081f2d705641abe5534",
  measurementId: "G-D05CTT6FKN"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebasedata = firebase;