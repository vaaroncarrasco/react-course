import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import { getHeroById } from '../selectors/getHeroById';


// ? Working with images

// * static resource import
// import batman from '../../assets/heroes/dc-batman.jpg';

// * WebPack feature - dynamic resource import
// const heroImages = require.context('../../assets/heroes', true);
import { heroImages } from '../../helpers/heroImages'



// * This component inherits props from the router it is called from: like props{}.history
export const HeroScreen = ({ history }) => {

    // * Get data from URL params from react-router
    const { heroeId } = useParams();

    // ? useMemo() - Optimize it to only fetch data if publisher is sent/changes
    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]);

    if (!hero) return <Redirect to="/" />

    // ? This component inherits props from the router it is called from: like props{}.history
    const handleReturn = () => {
        if ( history.length <= 2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    // src={ `../assets/heroes/${ heroeId }.jpg` } // from public/assets
                    // src={ batman } // static import

                    src={ heroImages(`./${ heroeId }.jpg`).default }

                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
