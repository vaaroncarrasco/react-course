import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    // ? useMemo() to memorize data - Optimize it to only fetch data if publisher changes.
    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);

    // * 2 tags <HigherOrderComponent></HigherOrderComponent>
    // * 1 tag <RegularComponent/>

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map( hero => (
                    <HeroCard
                        key={hero.id}
                        { ...hero }
                    />
                ))
            }
        </div>
    )
}
