import React from 'react'

// * memo() memorizes last state of component and only re-renders if props change
export const Small = React.memo(({ value }) => {

    console.log(value);

    return (
        <small> { value } </small>
    )
}
)