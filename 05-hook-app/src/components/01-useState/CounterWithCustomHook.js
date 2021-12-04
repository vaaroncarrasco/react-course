import React from 'react';
import { useCounter } from '../../hooks/useCounter';
import './counter.css';

export const CounterWithCustomHook = () => {

    // with customHooks we abstract logic from useStae/useEffect/useReducer/etc to exportable functions
    const { state, increment, decrement, reset } = useCounter(100); // increment(factor), decrement(factor)

    return (
        <>
            <h1>Counter with hook: { state }</h1>
            <hr/>

            <button onClick={ () => increment(2) } className="btn">+1</button>
            <button onClick={ reset } className="btn">reset</button>
            <button onClick={ () => decrement(2) } className="btn">-1</button>
        </>
    )
}
