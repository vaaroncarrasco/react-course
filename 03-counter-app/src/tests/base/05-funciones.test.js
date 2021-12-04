import { getUser, getUsuarioActivo } from "../../base/05-funciones";

describe('05-funciones test', () => {
    test('should return an object', () => {

        const userTest = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };

        const user = getUser();
        // console.log(user, userTest);

        // to have same props and values
        expect( user ).toEqual( userTest );
    });

    test('should return an object w/ the sent arg', () => {

        let username = 'Juan';
        const userTest = {
            uid: 'ABC567',
            username
        };

        const user = getUsuarioActivo(username);

        expect(user).toEqual(userTest);
    });
});
