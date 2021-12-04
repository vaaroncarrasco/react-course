import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

// ? This component inherits props from the router it is called from: like props{}.history
export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    // import context, in handleLogin dispatch action { name: 'fernando' } with type login

    const handleLogin = () => {
        // history.push('/'); // * sends to other direction and user is able to go <- one page back

        const lastPath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login,
            payload: {
                name: 'Fernando'
            }
        });

        history.replace( lastPath ); // * sends to other direction replacing current page unabling going <- back // good for security
    }

    return (
        <div className="container mt-5">
            <h1>LoginScreen</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )

}