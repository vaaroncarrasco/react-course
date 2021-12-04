import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router';
import '@testing-library/jest-dom'
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('testing <Navbar />', () => {

    // ? Testing history w/ history mock
    const historyMock = { // mocking history{}
        location: {},
        push: jest.fn(),
        listen: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'EL PEPE'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>

                {/* // ? Router history prop is accessed by child components */}
                <Router history={ historyMock }>

                    <Navbar />

                </Router>

            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('EL PEPE');
    });

    test('should call logout and use history', () => {
        wrapper.find('button').prop('onClick')();

        // ? Test dispatch
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        // ? Test useHistory() -> history.repalce('/');
        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    });

});