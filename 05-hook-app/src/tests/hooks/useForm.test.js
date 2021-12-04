import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe('testing useForm hook', () => {

    const initialForm = {
        name: 'Aaron Carrasco',
        email: 'aaron@gmail.com'
    };

    test('should return a form by default', () => {

        // * renderHook() returns result{}
        const { result } = renderHook( () => useForm(initialForm) );
        const [ values, handleInputChange, reset ] = result.current;
        expect( values ).toEqual( initialForm );
        expect( typeof handleInputChange ).toBe('function');
        expect( typeof reset ).toBe( 'function' );

    });

    test('should change form value (name)', () => {

        const { result } = renderHook( () => useForm(initialForm) );
        const [ , handleInputChange ] = result.current; // values current state -> { name: 'Aaron', email:'aaron@gmail.com' }

        act( () => {
            handleInputChange({ // * receives an event
                target: {
                    name: 'name',
                    value: 'Pepe'
                }
            });
        });

        const [ formValues ] = result.current; // values current state -> { name: 'Pepe', email:'aaron@gmail.com' }
        expect( formValues ).toEqual( { ...initialForm, name: 'Pepe' } );

    });

    test('should reset form', () => {

        const { result } = renderHook( () => useForm(initialForm) );
        const [ , handleInputChange, reset ] = result.current; // values current state -> { name: 'Aaron', email:'aaron@gmail.com' }

        act( () => {
            handleInputChange({ // * receives an event
                target: {
                    name: 'name',
                    value: 'Pepe'
                }
            });

            reset(); // reset to initial given state
        });

        const [ formValues ] = result.current; // values current state -> { name: 'Aaron', email:'aaron@gmail.com' }
        expect( formValues ).toEqual( initialForm );
    });

});
