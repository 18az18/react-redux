import firebase from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdQ_pqfPtWcLv9jdVzgDS4x2w5QYd5Jzk",
  authDomain: "auth-development-3e765.firebaseapp.com",
  projectId: "auth-development-3e765",
  storageBucket: "auth-development-3e765.appspot.com",
  messagingSenderId: "967730747437",
  appId: "1:967730747437:web:3fb34bfe06377be60300a4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);