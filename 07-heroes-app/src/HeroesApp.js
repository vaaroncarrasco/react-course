import React, { useEffect, useReducer } from 'react'
import { AppRouter } from './routers/AppRouter'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'

// ? return initialState empty { logged: false } or { user, name, logged } from localStorage
const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const HeroesApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    // * useEffect -> save in localStorage user if user changes
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify( user ));
    }, [user]);


    // Setting context provider in the highest hierarchy of the app
    return (
        <AuthContext.Provider value={{ user, dispatch }} >
            <AppRouter />
        </AuthContext.Provider>
    )
}
