import { retornaArreglo } from '../../base/07-deses-arr';

describe('07-deses-arr test', () => {
    test('should return string and number', () => {

        const [ letras, numeros ] = retornaArreglo(); // ['ABC', 123];

        expect( letras ).toBe('ABC');
        expect( typeof letras ).toBe('string');

        expect( numeros ).toBe(123);
        expect( typeof numeros ).toBe('number');
    });
});
