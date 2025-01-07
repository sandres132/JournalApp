import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IconButton, Typography } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { NoteView, NothingSelectedView } from '../views'
import { JournalLayout } from '../layout/JournalLayout'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {
        ( !!active 
            ? <NoteView/>
            : <NothingSelectedView/>
        )
      }
      
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
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
