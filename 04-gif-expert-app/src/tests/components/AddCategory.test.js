import React from "react";
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { AddCategory } from "../../components/AddCategory";

describe('testing AddCategory', () => {

    const setCategories = jest.fn(); // create jest functions for testing

    let wrapper = shallow( <AddCategory setCategories={ setCategories } /> );

    beforeEach( () => {
        jest.clearAllMocks();
        wrapper = shallow( <AddCategory setCategories={ setCategories } /> );
    });

    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    // ? Simulate input changes
    test('should change input text', () => {
        const input = wrapper.find('input');
        const value = 'Hola mundo';

        // * it needs the event{} from the input change -> simulate('change', e{})
        input.simulate('change', { target: { value } });

        expect( wrapper.find('p').text().trim() ).toBe( value )
    });

    test('should not post data on submit', () => {
        // beforeEach -> clear input text field 'Hola mundo' from prev test
        wrapper.find('form').simulate('submit', { preventDefault(){} });
        expect( setCategories ).not.toHaveBeenCalled();
    });

    test('should call setCategories and clear input text field', () => {

        // 1. simulate inputChange
        const input = wrapper.find('input');
        const value = 'Hackerman';

        input.simulate('change', { target: { value } });
        expect( wrapper.find('p').text().trim() ).toBe( value );

        // 2. simulate submit
        wrapper.find('form').simulate('submit', { preventDefault(){} });

        // 3. setCategories must be called
        expect( setCategories ).toHaveBeenCalled();
        expect( setCategories ).toHaveBeenCalledTimes(1);
        expect( setCategories ).toHaveBeenCalledWith( expect.any(Function) );

        // 4. input text field -> ''
        expect( input.prop('value') ).toBe('');
    })

});