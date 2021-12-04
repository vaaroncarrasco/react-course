import { mount } from 'enzyme'
import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('testing <SearchScreen />', () => {

    test('should display with default values', () => {

        const wrapper = mount(
            // ? Testing search thru URL params, import MemoryRouter, Route
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');

    });

    test('should show batman and input with query string', () => {
        const wrapper = mount(
            // ? Testing search thru URL params, import MemoryRouter, Route
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });

    test('should error box if hero not found', () => {
        const wrapper = mount(
            // ? Testing search thru URL params, import MemoryRouter, Route
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
    });

    test('should call history.push()', () => {

        const history = {
            push: jest.fn()
        }

        const wrapper = mount(
            // ? Testing search thru URL params, import MemoryRouter, Route
            <MemoryRouter initialEntries={['/search?q=batman123']}>

                <Route
                    path="/search"
                    // * Passing route's functional components props
                    component={ () => <SearchScreen history={ history } /> }
                />

            </MemoryRouter>
        );


        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        // ? Simulating form submit with preventDefault prop sent thru
        wrapper.find('form').prop('onSubmit')( { preventDefault(){} } );

        expect( history.push ).toHaveBeenCalledWith('?q=batman');

    });

});