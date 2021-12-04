import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    // * set reference on something to check if its mounted
    const isMounted = useRef(true);

    const [state, setState] = useState({ data: null, loading: true, error: null });

    // * check if mounted to execute functionality
    useEffect( () => {

        return () => { isMounted.current = false; }

    }, []);

    // ? Can not set state on un-mounted element
    useEffect( () => {

        setState({ data: null, loading: true, error: null });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                if ( isMounted.current ) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la data :(',
                });
            });

    }, [url]);

    return state;

}
