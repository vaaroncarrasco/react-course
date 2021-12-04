import React from 'react'
import PropTypes from 'prop-types';
import { useFetchGifs } from '../hooks/useFetchGifs'
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({ category }) => {

    // Every time theres a change in component, it runs the whole code all over again and again -> useEffect fixes this by calling functions once

    const { data:images, loading } = useFetchGifs( category );

    return (
        <>
            <h3> { category } </h3>

            { loading && <p>Loading...</p> }

            <div className="card-grid">
                {
                    images.map(img => (
                        <GifGridItem
                            key={ img.id }
                            // * spreading img{} props and sending em all at once instead of prop={ prop }
                            { ...img }
                            // img={ img }
                        />
                    ))
                }
            </div>
        </>
    )
}

GifGrid.propTypes = {
    category: PropTypes.string.isRequired
}