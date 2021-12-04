import { getHeroeById, getHeroesByOwner } from '../../base/08-imp-exp.js';
import heroes from '../../data/heroes.js';

describe('08-imp-exp test', () => {
    test('should return a heroe by id', () => {

        const id = 1;
        const heroe = getHeroeById(id);

        const heroeData = heroes.find( h => h.id === id);

        expect( heroe ).toEqual( heroeData );
    });

    test('should return a undefined if heroe doesnt exist', () => {

        const id = 123;
        const heroe = getHeroeById(id);

        expect( heroe ).toBe( undefined );
    });

    test('should return DC heroes arr', () => {

        const owner = 'DC';
        const heroesDC = getHeroesByOwner(owner);

        const filteredHeroes = heroes.filter( h => h.owner === owner);

        expect( heroesDC ).toEqual( filteredHeroes );

    });

    test('should return Marvel heroes arr', () => {

        const owner = 'Marvel';
        const heroesDC = getHeroesByOwner(owner);

        const filteredHeroes = heroes.filter( h => h.owner === owner);

        expect( heroesDC.length ).toBe( 2 );
        expect( heroesDC.length ).toEqual( filteredHeroes.length );

    });
});
