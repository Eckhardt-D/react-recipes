import firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyAQJUMnScIybdFG8Wi8f_ODivZlMuDDOqk",
    authDomain: "realrecipebook.firebaseapp.com",
    databaseURL: "https://realrecipebook.firebaseio.com",
    projectId: "realrecipebook",
    storageBucket: "realrecipebook.appspot.com",
    messagingSenderId: "994738615935"
};

firebase.initializeApp(config)

export default firebase
export const db = firebase.firestore()

firebase.auth().useDeviceLanguage()

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
});

export const auth = firebase.auth()