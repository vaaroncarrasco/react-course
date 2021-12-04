import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { NoteScreen } from '../../../components/notes/NoteScreen';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';


// ? mock fns
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: 123,
            title: 'Hola',
            body: 'mundo',
            date: 0
        }
      }
};

let store = mockStore(initState);
 store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);


describe('testing <NoteScrren />', () => {

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        // ? useEffect runs the first time component is rendered and runs again on change
        expect( activeNote ).toHaveBeenLastCalledWith( // avoid first render, only last
            123, // id
            {
                body: 'mundo',
                title: 'Hola de nuevo',
                id: 123,
                date: 0
            }
        )

    });
})
