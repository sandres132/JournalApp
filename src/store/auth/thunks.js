import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlices"


export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
    }
}

export const startGoolgleSignIn = () => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        // console.log(result);
        
        if (!result.ok) return dispatch(logout(result.errorMessage))
        
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName} ) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });
        
        if( !ok ) return dispatch( logout({errorMessage}) )
        
        dispatch(login({ uid, displayName, photoURL, email }));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        
        const result = await loginWithEmailPassword({email, password});
        // console.log(result);
        if( !result.ok ) return dispatch( logout({errorMessage: result.errorMessage}) )
        
        dispatch(login(result));
    }
}

export const startLogout = () => {
    // dispatch(checkingCredentials());

    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() )
    }
}