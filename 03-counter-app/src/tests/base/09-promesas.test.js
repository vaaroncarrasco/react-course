import { getHeroeByIdAsync } from "../../base/09-promesas";
import heroes from "../../data/heroes";

describe('09-promesas tests', () => {
    // ( done ) tells jest when to be done with async tasks
    test('should return a heroe async', ( done ) => {
        const id = 1;
        getHeroeByIdAsync(id)
            .then( heroe => {
                expect( heroe ).toBe( heroes[0] );
                done();
            });
    });

    // ( done ) tells jest when to be done with async tasks
    test('should return an err if heroe doesnt exist', ( done ) => {
        const id = 10;
        getHeroeByIdAsync(id)
            .catch( err => {
                expect( err ).toBe( 'No se pudo encontrar el héroe' );
                done();
            });
    });
});
