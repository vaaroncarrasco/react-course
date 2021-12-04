import { shallow } from 'enzyme';
import React from 'react';
import { TodoList } from '../../../components/09-useReducer/components/TodoList';
import { demoTodos } from '../fixtures/demoTodos';


describe('testing <TodoList />', () => {

    const handleDelete = jest.fn();
    const handleToggle = jest.fn();

    const wrapper = shallow(
        <TodoList
            todos={ demoTodos }
            handleDelete={ handleDelete }
            handleToggle={ handleToggle }
        />
    );

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should have 2 <TodoListItem />', () => {
        expect( wrapper.find('TodoListItem').length ).toBe( demoTodos.length );

        // * Expect <TodoListItem /> component prop/attributes
        expect( wrapper.find('TodoListItem').at(0).prop('handleDelete') ).toEqual( expect.any(Function) );
    });
});
