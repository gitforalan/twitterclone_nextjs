import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {

};

try {
  firebase.initializeApp(config);
} catch {
  
}

export default firebase;
