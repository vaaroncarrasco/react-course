import React from 'react';
import { mount, shallow } from "enzyme";
import { TodoApp } from "../../../components/09-useReducer/TodoApp";
import { demoTodos } from '../fixtures/demoTodos';
import { act } from '@testing-library/react';

describe('Testing <TodoApp /> app', () => {

    const wrapper = shallow( <TodoApp />) ;

    // ? Mock localStorage setting/adding/storing items functionality->
    Storage.prototype.setItem = jest.fn(()=>{});

    test('match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should add todo', () => {

        // * mount() -> for testing whole App in context // shallow() for components basic test
        const wrapper = mount(<TodoApp />); // rendered in a deeper level

        // Running functions
        act( () => {
            // find <TodoAdd /> component handleAddTodo fn prop and run it passing argument
            wrapper.find('TodoAdd').prop('handleAddTodo')(demoTodos[0]);
            wrapper.find('TodoAdd').prop('handleAddTodo')(demoTodos[1]);
        });

        expect( wrapper.find('h1').text().trim() ).toBe('TodoApp (2)');
        expect( localStorage.setItem ).toHaveBeenCalledTimes(2);

    });

    test('should delete todo', () => {

        wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[0] ); // find fn and run it .prop('fn')(param);
        wrapper.find('TodoList').prop('handleDelete')( demoTodos[0].id ); // find fn and run it .prop('fn')(param);

        expect( wrapper.find('h1').text().trim() ).toBe('TodoApp (0)');

    });

});