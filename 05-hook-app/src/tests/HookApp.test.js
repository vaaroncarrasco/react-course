import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../HookApp';

describe('Testing HookApp component', () => {

    test('should display correctly & match snapshot', () => {

        const wrapper = shallow(<HookApp />);
        expect( wrapper ).toMatchSnapshot();

    });

});
