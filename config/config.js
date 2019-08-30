import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDii-djjYOnD50OVZJOElHmStQcbHi24kw",
    authDomain: "teams-a5da5.firebaseapp.com",
    databaseURL: "https://teams-a5da5.firebaseio.com",
    projectId: "teams-a5da5",
    storageBucket: "",
    messagingSenderId: "280037535496",
    appId: "1:280037535496:web:dc6fa671d3874833"
  };

firebase.initializeApp(firebaseConfig)

export const f = firebase
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()