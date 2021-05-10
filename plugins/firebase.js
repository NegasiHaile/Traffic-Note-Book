
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
    apiKey: "AIzaSyAQ9qzsJ6FxHum0WCJVA3HeLHIoyGqRveA",
    authDomain: "negasi-93d50.firebaseapp.com",
    projectId: "negasi-93d50",
    storageBucket: "negasi-93d50.appspot.com",
    messagingSenderId: "1077937612483",
    appId: "1:1077937612483:web:051d373490005f98e42476"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const fireDb = firebase.firestore()
export default firebase