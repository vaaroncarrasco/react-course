import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const HomeScreen = () => {

    // 3. useContext -> use createdContext to get data -> import context component and useContext()
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>HomeScreen</h1>
            <hr />

            <pre>
                {
                    JSON.stringify( user, null, 3)
                }
            </pre>
        </div>
    )
}
