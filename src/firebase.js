import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBlCNH6K_DRtnydHw2fxbXC4UduPz-gddA",
    authDomain: "sport-chat-f9086.firebaseapp.com",
    projectId: "sport-chat-f9086",
    storageBucket: "sport-chat-f9086.appspot.com",
    messagingSenderId: "258511609518",
    appId: "1:258511609518:web:241f5cfbbce5883d7c173f"
  }).auth();