import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues ( initialState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    return [ values, handleInputChange, reset ];

}

// Each <input onChange={ handleInputChange }/> calls for its input value name/email -> calling twice
// setValues({
    // destructure state object ...{}, spread all props in case a prop aint changing
    // setting key name -> objPropName: value
    // name="name" value="formState.name" // name="email" value="formState.email"
//     ...values,
//     [ target.name ]: target.value // name: 'value'
// });