import { mount } from 'enzyme';
import React from 'react';
import { AppRouter } from '../../../components/10-useContext/AppRouter';
import { UserContext } from '../../../components/10-useContext/UserContext';

describe('testing <AppRouter />', () => {

    const user = {
        id: 1,
        name: 'Fernando'
    }

    const wrapper = mount(
        <UserContext.Provider value={ {user} }>
            <AppRouter />
        </UserContext.Provider>
    );

    test('should match snapshot', () => {

        expect( wrapper ).toMatchSnapshot();
    });

});
