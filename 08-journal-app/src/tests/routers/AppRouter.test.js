import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';

import { firebase } from '../../firebase/firebase-config';

import { MemoryRouter } from 'react-router';
import { AppRouter } from '../../routers/AppRouter';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

// ? Mock actions and mock dispatch
jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

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
    },
    notes: {
        active: 'ABC',
        notes: []
    }
};

let store = mockStore(initState);
// * Dispatch mock
store.dispatch = jest.fn();


describe('testing <AppRouter />', () => {

    test('should call login if authenticated', async () => {

        let user;

        await act( async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect( login ).toHaveBeenCalled();
        expect( login ).toHaveBeenCalledWith('l72DrEaNdwM7WTDr0cT9SWGNyWt2', null);


    });

});