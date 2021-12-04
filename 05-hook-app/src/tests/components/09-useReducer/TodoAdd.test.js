import React from 'react';
import { shallow } from 'enzyme';
import { TodoAdd } from '../../../components/09-useReducer/components/TodoAdd';

describe('testing <TodoAdd />', () => {

    const handleAddTodo = jest.fn();

    const wrapper = shallow(
        <TodoAdd
            handleAddTodo={ handleAddTodo }
        />
    );

    test('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should NOT call handleAddTodo', () => {

        const formSubmit = wrapper.find('form').prop('onSubmit');

        formSubmit({ preventDefault(){} }) // call it sending (e) -> e.preventDefault()

        expect( handleAddTodo ).toHaveBeenCalledTimes(0);
    });

    test('should call handleAddTodo', () => {
        // con un argumento/called
        // simulate input change // submit form // fn to have been called

        const value = 'Aprender MERN';
        wrapper.find('input').simulate('change', {
            target: {
                value,
                name: 'description'
            }
        });

        const formSubmit = wrapper.find('form').prop('onSubmit');

        formSubmit({ preventDefault(){} }) // call it sending (e) -> e.preventDefault()

        expect( handleAddTodo ).toHaveBeenCalledTimes(1);
        expect( handleAddTodo ).toHaveBeenCalledWith( expect.any(Object) );
        expect( handleAddTodo ).toHaveBeenCalledWith({
            id: expect.any(Number), // ? timestamp id check
            desc: value,
            done: false
        });

        expect( wrapper.find('input').prop('value') ).toBe('');

    });

});