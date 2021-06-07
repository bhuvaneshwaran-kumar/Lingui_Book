import firebase from 'firebase'

const firebaseConfig = {
  apiKey:           process.env.React_App_APIKEY,
  authDomain:       process.env.React_App_AUTHDOMAIN,
  projectId:        process.env.React_App_PROJECTID,
  storageBucket:    process.env.React_App_STORAGEBUCKET,
  messagingSenderId:process.env.React_App_MESSAGINGSENDERID,
  appId:            process.env.React_App_APIID
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()
export const provider = new firebase.auth.GoogleAuthProvider();

