import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch
  } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';


export const AppRouter = () => {

    // ? Only principal routers are wrapped in a <Router></Router> HOC component with a <Switch></Switch> component inside.
    // * Child-router is just a function component. It has only a <Switch></Switch> without <Router></Router>

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div>
                {/* We can set global style or html elements in here. They'd appear in every component */}
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ user.logged }
                    />

                    {/* All routes pass through this non-exact route "/" -> DashboardRoutes */}
                    <PrivateRoute
                        path="/"
                        component={ DashboardRoutes }
                        isAuthenticated={ user.logged }
                    />
                </Switch>
            </div>
        </Router>
    )
}
