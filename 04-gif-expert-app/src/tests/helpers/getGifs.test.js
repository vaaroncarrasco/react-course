import { getGifs } from "../../helpers/getGifs"

describe('testing getGifs fetching', () => {

    test('should return 10 elements', async () => {
        const gifs = await getGifs('Rick and Morty');
        expect( gifs.length ).toBe( 10 );
    });

    test('should return empty arrat', async () => {
        const gifs = await getGifs('');
        expect( gifs.length ).toBe( 0 );
    });

});
