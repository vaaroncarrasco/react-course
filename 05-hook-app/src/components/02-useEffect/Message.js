import React, { useEffect, useState } from 'react'

export const Message = () => {

    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const { x, y } = coords;

    // * Watchout for memory leaks on setting multiple event listener w/ useEffect on changes
    useEffect(() => {

        const mouseMove = (e) => {
            const coords = { x: e.x, y: e.y };
            setCoords( coords );
        }

        window.addEventListener('mousemove', mouseMove );

        return () => { window.removeEventListener('mousemove', mouseMove )}
    }, [])

    return (
        <>
            <h3>Eres un pendejo</h3>
            <p>
                x:{ x } y:{ y }
            </p>
        </>
    )
}
