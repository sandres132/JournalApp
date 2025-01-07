import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
  
    useEffect(() => {
      onAuthStateChanged( FirebaseAuth, async(user) => {
        
        if(!user) return dispatch(logout());
  
        const {uid, displayName, photoURL, email} = user;
  
        //dispatch sicrona del login pues el usuario ya esta logged
        dispatch(login({ uid, displayName, photoURL, email }))
        dispatch(startLoadingNotes())
      });
      
    }, []);

    return status;
}
