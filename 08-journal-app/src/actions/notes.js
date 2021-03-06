import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react-journal

export const startNewNote = () => {

    // ? getState -> second fn() argument we can access to get the state
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {

            // ? Firestore db from firebase-config.js
            const doc = await db.collection(`${uid}/journal/notes`).add( newNote ); // returns promise

            dispatch( activeNote( doc.id, newNote ) )
            dispatch( addNewNote( doc.id, newNote ) );

        } catch (error) {
            console.log(error);
        }

    }

}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: { id, ...note }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
})

// ? Fn returns async callback
export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    // ? getState -> second fn() argument we can access to get the state
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        // to prevent  url -> undefined
        if (!note.url) delete note.url

        // * clone var from note -> do not mutate arguments directly
        const noteToFirestore = { ...note };
        delete noteToFirestore.id; // delete operator

        // ? save to firestore db
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        // * dont need to load ALL notes for one update
        // dispatch( startLoadingNotes( uid ) )

        // ? update only one
        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success')

    }
}

export const refreshNote = ( id, note ) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

})

// ? Async task returns callback by using THUNK middleware
export const startUploading = ( file ) => {

    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        // * using helper
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();

    }

}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        // for reducer
        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});