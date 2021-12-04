import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {

    const { user:{ name }, dispatch  } = useContext(AuthContext);

    // * We can not access directly to { history } ass <Navbar /> isnt inside a <Router />

    // ? useHistory -> like useContext( Context.Provider )
    // * it works as long as components are inside Router.Provider to inherit context props
    const history = useHistory(); // useHistory(Router.Provider) // no need to specify it

    const handleLogout = () => { // dispatch logout action
        dispatch({ type: types.logout });
        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link
                className="navbar-brand"
                to="/"
            >
                Heroes App
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-time nav-link text-info">
                        { name }
                    </span>

                    <button
                        className="nav-item nav-link btn"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}