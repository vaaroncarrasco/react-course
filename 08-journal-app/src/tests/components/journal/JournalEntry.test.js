import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' //ES6 modules

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
    id: 1,
    date: 0,
    title: 'hola',
    body: 'mundo',
    url: 'https://domain.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry {...nota} />
    </Provider>
);


describe('testing <JournalEntry />', () => {

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call activeNote', () => {

        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota } )
        );

    });

});