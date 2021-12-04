import React from 'react'
import { mount } from "enzyme"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('testing <LoginScreen />', () => {

    // ? Testing history w/ history mock
    const history = { // mocking history{}
        replace: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn()
    };

    const wrapper = mount(

        // ? When working with context we need mount for deeper rendering

        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    );

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call dispatch and navigation', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Fernando'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/dc');

    })

});