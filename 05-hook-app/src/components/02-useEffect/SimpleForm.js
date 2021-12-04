import React, { useEffect, useState } from 'react'
import './effects.css'
import { Message } from './Message';

export const SimpleForm = () => {

    // Hooks can not be called conditionally/inside ifs

    const [formState, setFormState] = useState({
        name: '',
        email: ''
    });

    const { name, email } = formState;

    // * useEffect hooks allows to run an secondary effect when something happens in our component
    useEffect(() => {
        // console.log('hey');
    }, []);

    useEffect(() => {
        // console.log('formState cambió');
    }, [formState]);

    useEffect(() => {
        // console.log('formState cambió');
    }, [email]);

    const handleInputChange = ({ target }) => {
        // * Each <input onChange={ handleInputChange }/> calls for its input value name/email -> calling twice
        setFormState({
            ...formState, // destructure state object ...{}, spread all props in case a prop aint changing
            // * setting key name -> objPropName: value
            // name="name" value="formState.name" // name="email" value="formState.email"
            [ target.name ]: target.value // name: 'value'
        });
    }

    return (
        <>
            <h1>useEffect</h1>
            <hr/>


            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tu nombre"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Tu email"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
            </div>

            { (name === '123') && <Message /> }

        </>
    )
}
