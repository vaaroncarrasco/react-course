import React from 'react';
import { mount } from "enzyme"
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router';

describe('testing <DashboardRoutes />', () => {

    // <DashboardRoutes /> is inside a PrivateRoute so it needs to be logged in
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Aaron'
        }
    }

    test('should match snapshot', () => {
        // it needs a provided context value
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Aaron');
    });

});