import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGalery } from '../components'
import { useForm } from '../../hooks'
import { setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, imageUrls, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );

        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) )

    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Note updated', messageSaved, 'success')
        }
    }, [messageSaved])
    
    
    const onSaveNote = () => {
        dispatch(startSavingNote());
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;
        
        dispatch( startUploadingFiles( target.files ) );
    }
    
    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            sx={{mb:1}}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type='file'
                    ref={ fileInputRef }
                    multiple
                    onChange={ onFileInputChange }
                    style={{display: 'none'}}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined/>
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color='primary'
                    sx={{padding:2}}
                >
                    <SaveOutlined sx={{fontSize: 30, mr:1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Enter a title"
                    label="Title"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='What happened today?'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGalery/>

        </Grid>
    )
}
