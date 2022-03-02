import { auth } from './firebase';
import firebase from 'firebase/app';
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Google Login 
const provider = new firebase.auth.GoogleAuthProvider();
export const doSignInWithGoogle = () => 
  auth.signInWithPopup(provider);

// Facebook Login 
const facebook_provider = new firebase.auth.FacebookAuthProvider();
export const dosignwithFaceBook = () => 
  auth.signInWithPopup(facebook_provider);
