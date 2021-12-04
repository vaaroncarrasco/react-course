import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer'; // reducers are imported
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';

import './styles.css';

// destructured arrays [ ordered, props ]
// destructured objects { props, unordered:name }

const init = () => { // * returns initial state when calling init

    return JSON.parse(localStorage.getItem('todos')) || []; // if todos is null return []

    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Learn React',
    //     done: false
    // }];
}

// * init sets initialState which is immediatly saved in localStorage w/ 'todos' id as [] or [{}...]
// it rewrites the empty array [] because of using the same id

export const TodoApp = () => { // ? Remember react re-runs component code logic on every change

    const [ todos, dispatch ] = useReducer(todoReducer, [], init); // init runs to initiate initialState

    // ? localStorage saving when todos change - useEffect()
    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify( todos )); // localStorage only saves strings -> JSON stringify/parse
    }, [todos]);

    const handleDelete = (todoId) => {
        const action = {
            type: 'delete',
            payload: todoId
        }
        dispatch( action );
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        });
    }

    const handleAddTodo  = ( newTodo ) => {
        dispatch({
            type: 'add',
            payload: newTodo
        })
    }

    return (
        <>
            <h1>TodoApp ({ todos.length }) </h1>
            <hr />

            <div className="row">

                <div className="col-7">
                    <TodoList
                        todos={ todos }
                        handleDelete={ handleDelete }
                        handleToggle={ handleToggle }
                    />
                </div>

                <div className="col-5">

                    <TodoAdd
                        handleAddTodo={ handleAddTodo }
                    />

                </div>

            </div>

        </>
    )
}
