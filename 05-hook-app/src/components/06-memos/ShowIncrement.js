import React from 'react'

// Child component we pass a function into as argument/prop
export const ShowIncrement = React.memo(({ increment }) => {

    console.log('ShowIncrement me volvi a generar');

    return (
        <button
            className="btn btn-primary"
            onClick={ () => {
                increment( 5 );
            }}
        >
            incrementar
        </button>
    )
})
