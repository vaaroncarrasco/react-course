// ? async actions testing w/ redux-mock-store
// npm i redux-mock-store --save-dev

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { startDeleting, startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

// ? mock fileUpload fn
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://www.hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://www.hola-mundo.com/cosa.jpg');
    })
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'MLGJNZQeBuPkVfQvUARm',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

// ? mockStore allows us to dispatch actions // current store state mock
let store = mockStore( initState );

// * using 2nd database for development
// never mix dev, test and production db, data or env vars

describe('testing notes async actions', () => {


    beforeEach(() => {
        store = mockStore(initState);
    });


    test('should create note w/ startNewNote', async() => {

        // * Create db for testing without permissions
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        await store.dispatch( startDeleting( actions[0].payload.id ) );

    });

    test('startLoadingNotes must load notes', async() => {

        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions(); // [{},{}] array of actions{} called


        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    });

    test('startSaveNote should update note', async() => {

        const note = {
            id: 'MLGJNZQeBuPkVfQvUARm', // real doc id
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );

    });

    test('startUploading should update entry url', async() => {

        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc('/TESTING/journal/notes/MLGJNZQeBuPkVfQvUARm').get();
        expect( docRef.data().url ).toBe('https://www.hola-mundo.com/cosa.jpg');

    })

});