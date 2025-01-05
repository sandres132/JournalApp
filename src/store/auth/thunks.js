import { checkingCredentials } from "./authSlices"


export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
    }
}

export const startGoolgleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
    }
}