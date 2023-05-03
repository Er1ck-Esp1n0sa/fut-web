import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCp3qCGN3pxp5Fl-6VEPboVg-JKfODaxq0",
    authDomain: "messi-cloud-bbcd3.firebaseapp.com",
    projectId: "messi-cloud-bbcd3",
    storageBucket: "messi-cloud-bbcd3.appspot.com",
    messagingSenderId: "1042745406215",
    appId: "1:1042745406215:web:e8ac3ff1fc985f891e4ba2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export{
    storage, firestore as default
}