import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "../../hooks/useFetch";

describe('testing useFetch hook', () => {

    test('should return default data', () => {

        const { result } = renderHook( () => useFetch('https://www.breakingbadapi.com/api/quotes/1') );

        // We are not awaiting for the promise -> so it returns default state

        const { data, loading, error } = result.current;
        expect( data ).toBe( null );
        expect( loading ).toBe( true );
        expect( error ).toBe( null );

    });

    // test('should return desired data, loading, false, error null', async() => {

    //     // * waitForNextUpdate returns a promise -> test is async
    //     const { result, waitForNextUpdate } = renderHook( () => useFetch('https://www.breakingbadapi.com/api/quotes/1') );

    //     await waitForNextUpdate();

    //     const { data, loading, error } = result.current;
    //     expect( data.length ).toBe( 1 );
    //     expect( loading ).toBe( false );
    //     expect( error ).toBe( null );

    // });

    // test('should return error', async() => {

    //     // * waitForNextUpdate returns a promise -> test is async
    //     const { result, waitForNextUpdate } = renderHook( () => useFetch('https://reqres.in/apid/users?page=2') );

    //     await waitForNextUpdate();

    //     const { data, loading, error } = result.current;
    //     expect( data ).toBe( null );
    //     expect( loading ).toBe( false );
    //     expect( error ).toBe( 'No se pudo cargar la data :(' );

    // });

});