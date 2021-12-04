import React from 'react';

// ? Provider works like ContextProvider
import { Provider } from 'react-redux'

import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';


export const JournalApp = () => {
    return (

        // Provides store through app like contextProvider
        <Provider store={ store }>

            <AppRouter />

        </Provider>
    )
}