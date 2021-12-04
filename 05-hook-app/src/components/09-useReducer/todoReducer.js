export const todoReducer = ( state = [], action ) => {

    switch ( action.type ) {
        case 'add':
            return [ ...state, action.payload];

        case 'delete':
            // * return new array without the deleted todo
            return state.filter( todo => todo.id !== action.payload); // 123445

        case 'toggle':
            return state.map( todo =>
                ( todo.id === action.payload ) // if
                    ? { ...todo, done: !todo.done } // return
                    : todo // otherwise return
            )

        case 'toggle-old':
            return state.map( todo => {

                if ( todo.id === action.payload ) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                } else {
                    return todo;
                }

            });

        default:
            return state;
    }

}