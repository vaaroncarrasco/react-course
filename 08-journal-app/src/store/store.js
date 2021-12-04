import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

// ? Allowing react-redux devtools extensions and middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({ // combines all reducers into one reducer

    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
    // you can keep adding reducers...

});

// createStore() only accepts a single reducer
export const store = createStore(

    reducers,

    // ? Thunk Middleware for async actions
    composeEnhancers(
        applyMiddleware( thunk )
    )

);

// ? Place store in the highest point of our app structure
// in JournalApp.js where most app logic is contained

