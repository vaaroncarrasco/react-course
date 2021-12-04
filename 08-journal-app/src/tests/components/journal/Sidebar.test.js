import { mount } from 'enzyme';
import React from 'react'
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";


import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

// ? mock fns
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));


// ? FnComponents & Redux State
// Provider obj={ obj } > MemoryRouter > FnComponent
// initialState{} that simulates certain app state

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'l72DrEaNdwM7WTDr0cT9SWGNyWt2',
        name: 'test'
      },
      ui: {
        loading: false,
        msgError: null
      },
      notes: {
        notes: [],
        active: null
      }
};

let store = mockStore(initState);
// * Dispatch mock -not needed
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);

describe('testing <Sidebar />', () => {

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });

    test('should call logout', () => {
        // should call logout
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });



});