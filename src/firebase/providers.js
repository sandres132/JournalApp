import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,displayName, email, photoURL, uid 
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        return {
            ok: false,
            errorCode,
            errorMessage,
            email,
            credential
        }
    }
}


export const registerWithEmailPassword = async({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, uid } = resp.user;

        // TODO: actualizar el displayName del user en Firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true, displayName, email, photoURL, uid 
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        // console.log(resp);
        const { displayName, photoURL, uid } = resp.user;
        
        return {
            ok: true, displayName, photoURL, uid, email, password 
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}