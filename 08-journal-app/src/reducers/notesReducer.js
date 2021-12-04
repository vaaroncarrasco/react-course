/*

    {
        notes: [],
        active: null,
        active: {
            id: 'KJDKSAHDKSAK',
            title: '',
            body: '',
            imageUrl: '',
            date: 3244243
        }
    }

*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.notesActive:
            // ? Always return new state -> never mutate state
            return {
                ...state, // spread old state props
                active: {
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return {
                ...state,

                // ? Only update the one that matches
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case types.notesLogoutCleaning: {
            return initialState;
        }

        default:
            return state;

    }

}