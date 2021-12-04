import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: 'aaroncito',
    api_key: '275847388479917',
    api_secret: 'pgmKT_ytqVGDDID9kR2ZVJlO35Y',
    secure: true
});

describe('testing fileUpload', () => {

    test('should upload file and return url', async(done) => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        // blob is a text/binary-data file-like object of immutable raw data
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // delete img by id
        const segments = url.split('/');
        // get id from url /781h28h3ff.png
        const imgId = segments[ segments.length - 1 ].replace('.png', '');

        cloudinary.v2.api.delete_resources(imgId, {}, () => {
            done();
        });

    });

    test('should return error', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    });

});