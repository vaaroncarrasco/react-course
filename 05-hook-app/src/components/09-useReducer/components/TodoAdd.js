import React from 'react'
import { useForm } from '../../../hooks/useForm';

export const TodoAdd = ({ handleAddTodo }) => {

    const [ { description }, handleInputChange, reset ] = useForm({ // useForm returns [values{}, handleInputChange]
        // same as name="description" in html attributes
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( description.trim().length <= 1) return;

        // * new object
        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        }

        // * dispatch sends action to reducer
        handleAddTodo( newTodo );
        reset();

    }

    return (
        <>
            <h4>Agregar ToDo</h4>
            <hr />

            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Aprender..."
                    autoComplete="off"
                    value={ description }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-outline-primary mt-1 btn-block"
                >
                    Agregar
                </button>

            </form>
        </>
    )
}
