import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../../hooks/useCounter';

describe('useCounter hook test', () => {

    test('should return default values', () => {

        // * renderHook( () => customHook()  ) -> test hooks
        const { result } = renderHook( () => useCounter() );

        expect( result.current.counter ).toBe(10);
        expect( typeof result.current.increment ).toBe('function');
        expect( typeof result.current.decrement ).toBe('function');
        expect( typeof result.current.reset ).toBe('function');
    });

    test('should have counter at 100', () => {

        // * renderHook( () => customHook()  ) -> test hooks
        const { result } = renderHook( () => useCounter(100) );

        expect( result.current.counter ).toBe(100);
    });

    test('should increment', () => {

        const { result } = renderHook( () => useCounter(100) );
        const { increment } = result.current;

        // * When testing hooks -> import act from react hooks testing library
        act( () => {
            increment();
        });

        const { counter } = result.current;
        expect( counter ).toBe(101);

    });

    test('should decrement', () => {

        const { result } = renderHook( () => useCounter(100) );
        const { decrement } = result.current;

        // * When testing hooks -> import act from react hooks testing library
        act( () => { decrement() });

        const { counter } = result.current;
        expect( counter ).toBe(99);

    });

    test('should reset value', () => {

        const { result } = renderHook( () => useCounter(100) );
        const { decrement, reset } = result.current;

        // * When testing hooks -> import act from react hooks testing library
        act( () => {
            decrement();
            decrement(); // 99 - only decrements once cause state/ is just rendered once
            reset();
        });

        const { counter } = result.current;
        expect( counter ).toBe(100);

    });

});
