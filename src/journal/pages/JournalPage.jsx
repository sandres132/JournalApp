import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography variant='h2'>JournalPage</Typography> */}
      {/* <NothingSelectedView/> */}
      <NoteView/>
      
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          bottom: 40,
          right: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30 }}/>

      </IconButton>
    </JournalLayout>
  )
}
