import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = (note) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return note.title.length > 27
            ? note.title.substring(0, 17) + '...'
            : note.title;
    }, [note.title]);

    const newBody = useMemo(() => {
        return note.body.length > 27
            ? note.body.substring(0, 17) + '...'
            : note.body;
    }, [note.body])

    const onSelectNote = () => {
        dispatch( setActiveNote( note ) )
    }

  return (
    <ListItem disablePadding>
        <ListItemButton 
            onClick={onSelectNote}
        >
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={newBody}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
