import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyCp3qCGN3pxp5Fl-6VEPboVg-JKfODaxq0",
    authDomain: "messi-cloud-bbcd3.firebaseapp.com",
    projectId: "messi-cloud-bbcd3",
    storageBucket: "messi-cloud-bbcd3.appspot.com",
    messagingSenderId: "1042745406215",
    appId: "1:1042745406215:web:e8ac3ff1fc985f891e4ba2"
};  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};