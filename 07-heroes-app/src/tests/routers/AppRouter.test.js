import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('testing <AppRouter />', () => {

    const contextValue = {
        dispath: jest.fn(),
        user: {
            logged: false
        }
    }

    test('should display login component if not authenticated', () => {

        // ? Testing router with context
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();

    });

    test('should display heroScreen if authenticated', () => {

        const contextValue = {
            dispath: jest.fn(),
            user: {
                logged: true,
                name: 'EL PEPE'
            }
        }

        // ? Testing router with context
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe(true);

    });

});