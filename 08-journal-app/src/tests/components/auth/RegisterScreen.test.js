import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';


import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { types } from '../../../types/types';


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);


const initState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    }
}

let store = mockStore(initState);
// we only simulate dispatch when we dont need it
// store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)

describe('<RegisterScreen />', () => {

    test('should match snapshot', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('should dispatch respective action', () => {

        // ? .find( tag[attribute=value] )
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'email is required'
        })

    });

    test('should show alert box with message', () => {

        // * note: actions dont modify state on testing cause reducer wont work

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto' // err message
            }
        }

        const store = mockStore(initState);
        // we only simulate dispatch when we dont need it
        // store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );

    });

});