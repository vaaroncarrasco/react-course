// ? Hooks are just functions -> can use state/effect/reducer/context etc
// Functional components most of the time use -> react import is just for JSX
// * hooks start with useCustomHook

import { useEffect, useState } from "react"
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = ( category ) => {
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    // useEffect -> only run code block when component is rendered for the first time
    useEffect(() => { // * useEffect can not be async -> use PROMISE .then() instead
        getGifs( category )
            .then(imgs => {
                setState({
                    data: imgs,
                    loading: false
                });
            });
    }, [category]); // ? run when dependency change -> if none [] run code-block only once

    return state; // {  data: [10 imgs], loading: false };

}