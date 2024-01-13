import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMu0HV5BIVVDUVpTjz6w2LAujb1x3MJEc",
  authDomain: "zamara-firebase-auth.firebaseapp.com",
  projectId: "zamara-firebase-auth",
  storageBucket: "zamara-firebase-auth.appspot.com",
  messagingSenderId: "344074975240",
  appId: "1:344074975240:web:e1b663a86f832a736a39bd",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
