import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBgWalza_zvr3jnpyTkoK3UMwiFG1hV-zY",
  authDomain: "adnan-ahmed.firebaseapp.com",
  databaseURL: "https://adnan-ahmed.firebaseio.com",
  projectId: "adnan-ahmed",
  storageBucket: "adnan-ahmed.appspot.com",
  messagingSenderId: "522432240253",
  appId: "1:522432240253:web:4344d443c8eead43"
};

// Initialize Firebase
export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
