import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../selectors/getHeroesByName';

// Add SearchScreen
// implement submit of form w/ handleSearch and cl text
// use cusotm hooks from remote repo

// * React Forms
// 1) Use useForm() custom hook that uses useState()
// 2) set initialState -> useForm({ inputName: inputValue }) -> useForm({ searchText: '' })
// 3) Destruct state to get input value -> const { searchText } = formValues;
// 4) handleSubmit = (e) => { e.preventDefault(); }
// 5) HTML <form onSubmit={ handleSubmit }
// 6) <input name="searchText" value={ searchText } onChange={ handleInputChange }
// 7) <btn type="submit" -> to call handleSubmit

export const SearchScreen = ({ history }) => {

    // * getting ?q=query
    const location = useLocation(); // location.search -> ?q=batman

    // if q undefined -> = ''
    const { q = '' } = queryString.parse( location.search ); // batman

    const [ formValues, handleInputChange ] = useForm({
        // same as <input name="searchText"
        searchText: q
    });

    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchText }`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            name="searchText"
                            value={ searchText }
                            onChange={ handleInputChange }
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>

                </div>

                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            &&
                            <div className="alert alert-danger">
                                There's no hero named { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>

            </div>

        </div>
    )
}
