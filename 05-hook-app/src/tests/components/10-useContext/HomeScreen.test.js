import React from 'react';
import { mount } from 'enzyme';
import { HomeScreen } from '../../../components/10-useContext/HomeScreen';
import { UserContext } from '../../../components/10-useContext/UserContext';

describe('testing <HomeScreen />', () => {

    const user = {
        name: 'Aaron',
        email: 'aaron@gmail.com'
    }

    // * Testing useContext -> render w/ mount() wrapping child component with UserContext.Provider/HigherOrderComponent
    const wrapper = mount(
        <UserContext.Provider value={ {user} }>
            <HomeScreen />
        </UserContext.Provider>
    );

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();

    });

});