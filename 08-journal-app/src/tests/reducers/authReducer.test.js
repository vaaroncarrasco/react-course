import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
// login: '[Auth] Login',
// logout: '[Auth] Logout',

describe('testing authReducer', () => {

    test('should return {uid,name} on login ', () => {

        const state = authReducer({}, {
            type: types.login,
            payload: {
                uid: 123,
                displayName: 'Juan'
            }
        });

        expect( state ).toEqual({
            uid: 123,
            name: 'Juan'
        });

    });

    test('should return empty{} on logout', () => {

        const state = authReducer(
            {
                uid: 123,
                displayName: 'Juan'
            },
            {
                type: types.logout
            }
        );

        expect( state ).toEqual({});

    });

    test('should return default state', () => {

        const state = authReducer(
            {
                uid: 123,
                displayName: 'Juan'
            },
            {}
        );

        expect( state ).toEqual({
            uid: 123,
            displayName: 'Juan'
        });

    });

});