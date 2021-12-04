import React from 'react';
import { useCountRenders } from './useCountRenders';

export const Square = React.memo(({ n, increment }) => { // * memo() -> if prop change, re-render component

    useCountRenders();

    return <button onClick={ () => increment(n) }>{n}</button>
});