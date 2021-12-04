import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    // ? useForm -> for note input values and fill them if they already exist
    const { active: note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    // ? useRef() react hook -> stores mutable var without re running comp if changes
    const activeId = useRef( note.id ); // {}.current -> current value
    useEffect(() => { // be aware of infinite loops
        if ( note.id !== activeId.current ) {
            reset( note ); // set note new state
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }


    // ? ALWAYS REMEMBER TO ADD name, value, onChange -> input properties
    // for correct form + useState usage

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) &&
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
