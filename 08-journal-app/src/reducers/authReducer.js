import { types } from "../types/types";

/*
    {
        uid: foihfos98427998r9,
        name: 'Aaron'
    }
*/

export const authReducer = ( state = {} , action ) => { // must always return an state

    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return { }

        default:
            return state;
    }

}
