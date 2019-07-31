import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAoD6Q6L_vqIN1wBeQ8MVJyoNdfLMRbiOk",
  authDomain: "mogo-bi.firebaseapp.com",
  databaseURL: "https://mogo-bi.firebaseio.com",
  projectId: "mogo-bi",
  storageBucket: "mogo-bi.appspot.com",
  messagingSenderId: "169620630404"
};
firebase.initializeApp(config);

export default firebase;
