import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSavings, updateNote } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote(true) );

        const { uid } = getState().auth

        const newNote = {
            title: 'defaultTitle',
            body: 'Something to add',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes/` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //dispatch

        dispatch( addNewEmptyNote( newNote) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El ID del usuario no existe');
        
        const notes = await loadNotes( uid );
        
        dispatch( setNotes(notes) )
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch(setSavings());

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El ID del usuario no existe');
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFirestore, {merge: true});

        dispatch( updateNote(note) )
        
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
       dispatch( setSavings() );

        //await fileUpload( files[0] );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        // console.log(photosUrls);

        dispatch( setPhotosToActiveNote( photosUrls ) )
    
    }
}