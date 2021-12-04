import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    // spread ...rest of props
    // console.log(rest); // rest{ path, location, computedMatch, location }

    // ? Set every time a route passes through PrivateRoute

    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        // { ...rest } passing all props to <Route />
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/login" /> )
            )}
        />
    )
}

// Functional Components are functions
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
