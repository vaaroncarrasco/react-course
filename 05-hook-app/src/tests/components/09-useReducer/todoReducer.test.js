import { todoReducer } from "../../../components/09-useReducer/todoReducer"
import { demoTodos } from "../fixtures/demoTodos";

describe('testing todoReducer', () => {

    test('should return default state', () => {
        const state = todoReducer(demoTodos, {});
        expect( state ).toEqual(demoTodos);
    });

    test('should return state[] with new object', () => {
        const state = todoReducer(demoTodos, {
            type: 'add',
            payload: {
                id: 3,
                todo: 'Comprar arroz',
                done: false
            }
        });
        expect( state.length ).toBe(3);
    });

    test('should delete todo', () => {
        const state = todoReducer(demoTodos, {
            type: 'delete',
            payload: 2
        });
        expect( state.length ).toBe(1);
    });

    test('should toggle done prop true/false', () => {
        const state = todoReducer(demoTodos, {
            type: 'toggle',
            payload: 1
        });
        expect( state[0].done ).toBe(true);
    });

});