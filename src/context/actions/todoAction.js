import { SET_TODO_INPUT, ADD_TODO, CLEAR_INPUT, DELETE_TODO } from '../type/constants';

export const setTodoInput = (payload) => ({
    type: SET_TODO_INPUT,
    payload,
});
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload,
});

export const cleaInput = () => ({
    type: CLEAR_INPUT,
});
export const deleteIodo = (payload) => ({
    type: DELETE_TODO,
    payload,
});
