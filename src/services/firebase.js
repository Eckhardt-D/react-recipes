import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: process.env.REACT_APP_API,
    authDomain: process.env.REACT_APP_AUTH,
    databaseURL: process.env.REACT_APP_DBURL,
    projectId: process.env.REACT_APP_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MSGID
};

firebase.initializeApp(config)

export default firebase
export const db = firebase.firestore()

firebase.auth().useDeviceLanguage()

export const auth = firebase.auth()