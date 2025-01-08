import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";
jest.setTimeout(8000)

describe('Tests in journal thunks', () => {
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks());

    test('should create a new note', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }});
        await startNewNote()(dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            "body": "Something to add",
            "date": expect.any(Number),
            "id": expect.any(String),
            "imageUrls": [],
            "title": "defaultTitle",
        }));

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            "body": "Something to add",
            "date": expect.any(Number),
            "id": expect.any(String),
            "imageUrls": [],
            "title": "defaultTitle",
        }));

        // Erase from Firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref )));
        await Promise.all( deletePromises );
        
    })
})