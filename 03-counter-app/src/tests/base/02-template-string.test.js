import '@testing-library/jest-dom';
import { getSaludo } from '../../base/02-template-string';


describe('02-template-string.js test', () => {

    test('getSaludo must return hola fernando', () => {

        const nombre = 'Fernando';
        const saludo = getSaludo(nombre);

        expect(saludo).toBe('Hola ' + nombre);

    });

    test('getSaludo must return Hola Carlos! if theres no arg', () => {
        const saludo = getSaludo();
        expect(saludo).toBe('Hola Carlos');
    });

});
