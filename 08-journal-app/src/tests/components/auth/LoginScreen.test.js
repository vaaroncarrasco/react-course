import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen'
import { MemoryRouter } from 'react-router';

// ? Mock actions and mock dispatch
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))


// ? FnComponents & Redux State
// Provider obj={ obj } > MemoryRouter > FnComponent
// initialState{} that simulates certain app state

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
// * Dispatch mock
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('<LoginScreen /> testing', () => {

    beforeEach(() => {
        store = mockStore(initState);
        // clear mocks before each test
        jest.clearAllMocks();
    });

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch startLoginScreen action', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('should dispatch startLogin action with args', () => {

        // ? simulate form submit (action ) with args
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLoginEmailPassword ).toHaveBeenLastCalledWith('','');

    });

});