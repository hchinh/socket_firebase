import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBI8PXatCWpDJTgEBAICknkgHuMMJY6mzg",
  authDomain: "realtime-chat-cd406.firebaseapp.com",
  projectId: "realtime-chat-cd406",
  storageBucket: "realtime-chat-cd406.appspot.com",
  messagingSenderId: "471033433883",
  appId: "1:471033433883:web:1afa3b844b60af9004cdbe",
  measurementId: "G-BHDJWVY8H9",
  databaseURL:
    "https://realtime-chat-cd406-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
