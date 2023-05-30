import React from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../config';
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


function Login() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/home'; 
        navigate(path);
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.info(token);
        console.info(user);

        routeChange();
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.info(errorCode);
        console.info(errorMessage);
        console.info(email);
        console.info(credential);
    });
}

return (
    <>
    <div class="contenedor" >   
    <div class="contenedor2" >
    <h1>INICIAR SESION </h1>
    </div>
    <div class="contenedor3" >
        <button class='button3' onClick={signInWithGoogle}>
        GOOGLE
        </button>
    </div>
    </div> 
    </>
    );
}

export default Login;