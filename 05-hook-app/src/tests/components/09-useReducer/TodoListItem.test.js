import { shallow } from 'enzyme';
import React from 'react';
import { TodoListItem } from '../../../components/09-useReducer/components/TodoListItem';
import { demoTodos } from '../fixtures/demoTodos';

const handleDelete = jest.fn();
const handleToggle = jest.fn();

describe('testing <TodoListItem />', () => {

    const wrapper = shallow(
        <TodoListItem
            todo={ demoTodos[0] }
            index={0}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
        />
    );

    test('should display and match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call fn handleDelete', () => {
        // jest.fn()
        // toHaveBeenCalled/With
        wrapper.find('button').simulate('click');
        expect( handleDelete ).toHaveBeenCalledWith( demoTodos[0].id );
    });

    test('should call fn handleToggle', () => {
        // jest.fn()
        // toHaveBeenCalled/With
        wrapper.find('p').simulate('click');
        expect( handleToggle ).toHaveBeenCalledWith( demoTodos[0].id );
    });

    test('should show text correctly', () => {
        const content = wrapper.find('p').text().trim();
        expect( content ).toBe(`1. ${demoTodos[0].desc}`);
    });

    test('should have className complete if done true', () => {

        const todo = demoTodos[0];
        todo.done = true;

        const wrapper = shallow( <TodoListItem todo={ todo } /> );

        expect(wrapper.find('p').hasClass('complete')).toBe(true);

    });

});
