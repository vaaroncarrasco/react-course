import { types } from '../../types/types';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('auth actions testing', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })


    // Sync tasks test
    test('login and logout must create respective action', () => {

        const loginReturn = login('UID', 'displayName');
        expect( loginReturn ).toEqual({
            type: types.login,
            payload: {
                uid: 'UID',
                displayName: 'displayName'
            }
        })

        const logoutReturn = logout();
        expect(logoutReturn).toEqual({
            type: types.logout
        });

    });

    test('should do logout', async() => {

        await  store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });


        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('startLoginEmailPassword must run', async() => {

        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'l72DrEaNdwM7WTDr0cT9SWGNyWt2',
                displayName: null
            }
        })

    });

});