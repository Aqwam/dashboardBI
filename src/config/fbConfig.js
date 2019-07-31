import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBKUVlm3KmuV_uAMWlJJ6AM8V82cU2wtgo",
  authDomain: "hc-bi-984fa.firebaseapp.com",
  databaseURL: "https://hc-bi-984fa.firebaseio.com/",
  projectId: "hc-bi",
  storageBucket: "gs://hc-bi-984fa.appspot.com",
  messagingSenderId: "789290871363"
};
firebase.initializeApp(config);

export default firebase;
