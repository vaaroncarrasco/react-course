import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    // * Check if user is authenticated
    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //? Maintain state using firebase
    useEffect(() => {

        // * onAuthStateChanged -> creates an Observable
        // Observable -> special obj that is triggered depending on events

        // ? Async cause loadNotes() returns promise
        firebase.auth().onAuthStateChanged( async (user) => {

            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName) );

                setIsLoggedIn( true );

                // * Components should only dispatch and actions do heavy tasks
                dispatch( startLoadingNotes( user.uid ) )

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        })

    }, [dispatch, setChecking, setIsLoggedIn]); // only runs once

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={ isLoggedIn }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        isAuthenticated={ isLoggedIn }
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
