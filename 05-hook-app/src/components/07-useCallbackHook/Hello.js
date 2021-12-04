import React from 'react';
// import { useCountRenders } from './useCountRenders';

export const Hello = React.memo(({ increment }) => { // * memo() -> if prop change, re-render component

    // useCountRenders();

    return <button onClick={ () => increment(5) }>Hello</button>
});