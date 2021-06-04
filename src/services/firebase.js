import firebase from 'firebase/app'
import 'firebase/storage'

// firebase init - add your own config here
var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const storage = firebase.storage()

// export utils/refs
export {
  storage,
}