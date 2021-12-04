// import { renderHook } from '@testing-library/react-hooks';
// import { useFetchGifs } from '../../hooks/useFetchGifs';


// ? Testing hooks library for react -> testing running hooks

describe('testing useFetchGifs hook', () => { // can not shallow render cause its a simple hook function

    test('should do nothing', () => { console.log(true) });

    // When running this test it affects state
    // test('should return initial state', async () => {
    //     const category = 'hackerman';
    //     const { result, waitForNextUpdate } = renderHook( () => useFetchGifs(category) );
    //     const { data, loading } = result.current;

    //     await waitForNextUpdate(); // await custom hook execution

    //     expect( data ).toEqual([]);
    //     expect( loading ).toBe(true);
    // });

    // test('should return array with imgs and false loading', async () => {
    //     const category = 'anonymous';
    //     const { result, waitForNextUpdate } = renderHook( () => useFetchGifs(category) );

    //     await waitForNextUpdate(); // await custom hook execution for it to bring data

    //     const { data, loading } = result.current;

    //     expect( data.length ).toBe(10);
    //     expect( loading ).toBe(false);
    // });

});