import React from "react";
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import CounterApp from "../CounterApp";

describe('testing <CounterApp />', () => {

    let wrapper = shallow( <CounterApp />);

    // * To reset component before each test
    beforeEach( () => {
        wrapper = shallow( <CounterApp />);
    });

    test('should show <CounterApp /> & match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });


    test('should show value 100', () => {
        const wrapper = shallow( <CounterApp value={ 100 }/>);
        const counter = wrapper.find('h2').text();
        expect( wrapper ).toMatchSnapshot();
        expect( counter ).toBe('100');
    });

    test('should increment w/ btn +1', () => {
        wrapper.find('button').at(0).simulate('click');
        const counterText = wrapper.find('h2').text();
        expect( counterText ).toBe('11');
    });

    test('should decrement w/ btn -1', () => {
        wrapper.find('button').at(2).simulate('click');
        const counterText = wrapper.find('h2').text();
        expect( counterText ).toBe('9');
    });

    test('should reset value w/ btn', () => {
        const wrapper = shallow( <CounterApp value={ 69 }/>);

        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');

        const counterText = wrapper.find('h2').text();

        expect( counterText ).toBe('69');
    });

});
