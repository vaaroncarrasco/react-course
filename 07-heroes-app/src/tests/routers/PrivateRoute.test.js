import { mount } from "enzyme"
import React from "react"
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute"

// ? <Route> testing

describe('testing <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    // ? Simulate localStorage functionalities
    Storage.prototype.setItem = jest.fn();

    test('should display component if authenticated and store in localStorage', () => {

        // * mount() renders HigherOrderComponents nested components
        const wrapper = mount(

            // ? <Route> testing -> we can not use Route outside Router
            // for testing we wrap it inside <MemoryRouter></MemoryRouter>
            <MemoryRouter>

                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>hola mundo</span>}
                    { ...props } // * spreading the ...rest of props
                />

            </MemoryRouter>
        );

        // now it can render the component from route
        // console.log( wrapper.html() ); // <span>hola mundo</span>

        expect( wrapper.find('span').exists() ).toBe( true );
        // if is not authenticated, -> <Redirect to="/login" /> will return ''

        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    });

    test('should block component if !isAuthenticated', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={ () => <span>hello world</span>}
                    { ...props }
                />
            </MemoryRouter>
        );
        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });

});