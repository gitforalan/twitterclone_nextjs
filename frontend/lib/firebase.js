import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDc4RMKCzpnNzgpphDFASxaVnD-7evL9Ug",
  authDomain: "twitterclone-nextjs-b7ce8.firebaseapp.com",
  databaseURL: "https://twitterclone-nextjs-b7ce8.firebaseio.com",
  projectId: "twitterclone-nextjs-b7ce8",
  storageBucket: "twitterclone-nextjs-b7ce8.appspot.com",
  messagingSenderId: "291666232014"
};

try {
  firebase.initializeApp(config);
} catch {
  
}

export default firebase;
