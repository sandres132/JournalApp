import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'Email need an @'],
  password: [ (value) => value.length >= 8, 'Password need at least 8 characters'],
  displayName: [ (value) => value.length >= 2, 'Name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
    email,
    password,
    displayName,
    onInputChange,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) )
    
  }

  return (
    <AuthLayout title='Register'>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label="Name"
              type='text'
              placeholder='Full Name'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted }
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label="Email"
              type='email'
              placeholder='email@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted }
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label="Password"
              type='password'
              placeholder='password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted }
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb:2, mt:1}}>
            <Grid 
              item
              xs={12}
              sm ={12}
              display={!!errorMessage ? '': 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm ={12}>
              <Button
                disabled= { isCheckingAuthentication }
                type='submit'
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Do you have an account?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login" >
              login
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
