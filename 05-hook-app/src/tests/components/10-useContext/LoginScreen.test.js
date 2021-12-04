import React from "react";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/10-useContext/LoginScreen";
import { UserContext } from "../../../components/10-useContext/UserContext";

describe('testing <LoginScreen />', () => {

    const setUser = jest.fn();

    // * Testing useContext -> render w/ mount() wrapping child component with UserContext.Provider/HigherOrderComponent
    const wrapper = mount(
        <UserContext.Provider value={ {setUser} }>
            <LoginScreen />
        </UserContext.Provider>
    );

    test('should match snapshot', () => { expect( wrapper ).toMatchSnapshot(); });

    test('should run setUser w/ expected argument', () => {

        wrapper.find('button').prop('onClick')();

        expect( setUser ).toHaveBeenCalledWith({
            id: 123,
            name: 'Aaron'
        });

    });

});
