import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.React_App_APIKEY,
  authDomain: process.env.React_App_AUTHDOMAIN,
  projectId: process.env.React_App_PROJECTID,
  storageBucket: process.env.React_App_STORAGEBUCKET,
  messagingSenderId: process.env.React_App_MESSAGINGSENDERID,
  appId: process.env.React_App_APIID
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


export const db = firebase.firestore()
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp

