import { types } from '../types/types';

// * authReducer is just a pure function
export const authReducer = (state = {}, action) => {

    // const state = {
    //     name: 'Fernando',
    //     logged: true
    // }

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }

        default:
            return state;
    }

}