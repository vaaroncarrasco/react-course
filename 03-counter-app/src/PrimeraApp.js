import React from "react";
import PropTypes from 'prop-types';

// ? Functional Components
const PrimeraApp = ({ saludo, subtitulo }) => {
    // * Return elements in Component -> Fragment <></>
    // <></> is the same as <Fragment></Fragment>
    // return () encapsulates one object/fragment/element in one return
    return (
        <>
            {/* printing objects */}
            {/* <pre> { JSON.stringify(object, null, 3) } </pre> */}
            <h1>{ saludo }</h1>
            <p>{ subtitulo }</p>
        </>
    );

    // return (
    //     <Fragment>
    //         <h1>Hola mundo</h1>
    //         <p>Mi primera app</p>
    //     </Fragment>
    // );
}

// Component properties expected types
PrimeraApp.propTypes = {
    saludo: PropTypes.string.isRequired
}

PrimeraApp.defaultProps = {
    subtitulo: 'soy un texto de prueba'
}

export default PrimeraApp;