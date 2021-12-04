import React from 'react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme';
import { GifGridItem } from '../../components/GifGridItem';

describe('GifGridItem testing', () => {

    const title = 'hola mundo';
    const url = 'https://localhost/hola.gif';
    const wrapper = shallow(<GifGridItem title={ title } url={ url }/>);

    test('should show component and match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should have a p with title', () => {
        const p = wrapper.find('p');
        expect( p.text().trim() ).toBe( title );
    });

    test('should have an img with src=url & alt=title', () => {
        const img = wrapper.find('img');

        expect( img.prop('src') ).toBe( url );
        expect( img.prop('alt') ).toBe( title );
    });

    test('should have animate_fadeIn', () => {
        const div = wrapper.find('div');
        const className = div.prop('className');
        expect( className ).toBe( 'card animate__animated animate__fadeIn' );
    });

});
