import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

import { CheckingAuth } from '../ui/'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  // const dispatch = useDispatch();
  // const { status } = useSelector( state => state.auth );

  // useEffect(() => {
  //   onAuthStateChanged( FirebaseAuth, async(user) => {
      
  //     if(!user) return dispatch(logout());

  //     const {uid, displayName, photoURL, email} = user;

  //     //dispatch sicrona del login pues el usuario ya esta logged
  //     dispatch(login({ uid, displayName, photoURL, email }))
  //   });
    
  // }, []);

  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth/>
  }
 
  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes/>} />
          : <Route path="/auth/*" element={<AuthRoutes/>} />
      }

      <Route path="/*" element={<Navigate to='/auth/login'/>} />

      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes/>} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes/>} /> */}

    </Routes>
  )
}
