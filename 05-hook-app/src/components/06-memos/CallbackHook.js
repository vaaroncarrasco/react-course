import React, { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';
import '../02-useEffect/effects.css';

// ? when we need to pass a function to a child component
export const CallbackHook = () => {

    const [counter, setCounter] = useState(10);

    // * When CallbackHook component renders -> re-writes increment const in memory every time
    // const increment = () => {
    //     setCounter( counter + 1 );
    // }

    // * useCallback + React.memo() in child component
    // ? useCallback -> returns a memorized version of a function/callback to send to other components
    // ? only if [dependency] has not changed
    const increment = useCallback( (num) => { // useCallback(()=>{},[]) returns a function
        setCounter( c => c + num );
    }, [ setCounter ]); // if dependency changes -> re run function

    return (
        <div>
            <h1>useCallback Hook: {counter }</h1>
            <hr />

            <ShowIncrement increment={ increment } />


        </div>
    )
}
