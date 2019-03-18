import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDd2x5Fmp1cto8vuG1JYqKKbVYNKSIVArE",
  authDomain: "twitterclone-nextjs-2.firebaseapp.com",
  databaseURL: "https://twitterclone-nextjs-2.firebaseio.com",
  projectId: "twitterclone-nextjs-2",
  storageBucket: "twitterclone-nextjs-2.appspot.com",
  messagingSenderId: "453379705783"
}

try {
  firebase.initializeApp(config);
} catch {
  
}

export default firebase;
