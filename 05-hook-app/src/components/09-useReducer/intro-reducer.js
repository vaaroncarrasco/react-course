
const initialState = [{
    id: 1,
    todo: 'Comprar frijoles',
    done: false
}];

const todoReducer = (state = initialState, action) => {

    if (action?.type === 'agregar') {
        return [ ...state, action.payload ];
    } // reducer can not have else/return

    return state;
}

let todos = todoReducer();

// ! DO NOT USE .push() IN REACT // DO NOT MUTATE STATE -> state++
// ? ALWAYS CREATE NEW STATE -> state + 1


const newTodo = {
    id: 2,
    todo: 'Comprar arroz',
    done: false
}

const agregarTodoAction = {
    type: 'agregar',
    payload: newTodo,
}

todos = todoReducer( todos, agregarTodoAction );

console.log(todos);