import React from "react";
import { shallow } from "enzyme";
import { RealExampleRef } from "../../../components/04-useRef/RealExampleRef";

describe('testing <RealExampleRef />', () => {

    // * shallow() tests component in isolation context
    const wrapper = shallow( <RealExampleRef /> );

    test('should display and match snapshot', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('MultipleCustomHooks').exists() ).toBe( false );

    });

    test('should display component <MultipleCustomHooks /> by simulating click/changing state', () => {

        wrapper.find('button').simulate('click');
        expect( wrapper.find('MultipleCustomHooks').exists() ).toBe( true );

    });
});
