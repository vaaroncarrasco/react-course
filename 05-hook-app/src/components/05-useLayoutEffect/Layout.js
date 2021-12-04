import React, { useLayoutEffect, useRef } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { useFetch } from '../../hooks/useFetch';
import './layout.css';

export const Layout = () => {

    const { counter, increment } = useCounter(1);
    const { data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${ counter }`); // when url changes, fetch runs agains

    const { quote } = !!data && data[0]; // if data exists, extract from 1st

    const pTag = useRef();

    // ? useLayoutEffect to read layout and syncly re-render when dependency changes
    useLayoutEffect( () => {

        console.log(pTag.current.getBoundingClientRect());

    }, [quote]);

    return (
        <>
            <h1>LayoutEffect</h1>
            <hr/>

            <blockquote className="blockquote text-right">
                <p
                    ref={ pTag }
                    className="mb-0"
                >
                    { quote }
                </p>
            </blockquote>

            <button
                className="btn btn-primary"
                onClick={ increment }
            >
                Next quote
            </button>
        </>
    )

}
