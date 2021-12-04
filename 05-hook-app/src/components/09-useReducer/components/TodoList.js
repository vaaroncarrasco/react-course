import React from 'react'
import { TodoListItem } from './TodoListItem'
import PropTypes from 'prop-types';

export const TodoList = ({ todos, handleDelete, handleToggle }) => {
    return (
        <ul className="list-group list-group-flush">
            {
                todos.map( (todo, index) => ( // * () => () -> () implicitly returning an object
                    <TodoListItem
                        key={ todo.id }
                        todo={ todo }
                        index={ index }
                        handleDelete={ handleDelete }
                        handleToggle={ handleToggle }
                    />
                ))
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired
}
