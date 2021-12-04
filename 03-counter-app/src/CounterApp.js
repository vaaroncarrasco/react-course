import React, { useState } from 'react'
// rafcp - > shortcut

// ? Functional Components
// * -> Functional Component has a props{} you can destructure
// props -> destructued -> props.value -> { value }
const CounterApp = ({ value = 10 }) => {

    // * useState() returns state[] array -> [value, setValue]
    const [ counter, setCounter ] = useState( value );

    const handleAdd = e => setCounter(counter + 1)
    const handleSubtract = e => setCounter(counter - 1)
    const handleReset = e => setCounter(value)

    // * In => when first argument is sent as first argument to a callback -> simplify function without ()
    // <button onClick={ (e) => handleAdd(e) } >+1</button>
    // * Without () because its a callback, it is called when needed, not right away
    // <button onClick={ handleAdd } >+1</button>

    return (
        <>
            {/* printing objects */}
            {/* <pre> { JSON.stringify(object, null, 3) } </pre> */}
            <h1>CounterApp</h1>
            <h2>{ counter }</h2>
            <button onClick={ handleAdd }>+1</button>
            <button onClick={ handleReset }>Reset</button>
            <button onClick={ handleSubtract }>-1</button>
        </>
    )

    // return (
    //     <Fragment>
    //         <h1>Hola mundo</h1>
    //         <p>Mi primera app</p>
    //     </Fragment>
    // );
}

export default CounterApp


