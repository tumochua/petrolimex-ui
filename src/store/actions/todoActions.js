import { ADD_TODO, GET_TODOS, DELETE_TODO } from '../type/todos';

export const addTodo = (todo) => (dispatch) => {
    dispatch({ type: ADD_TODO, payload: todo });
};

export const getTodos = (todo) => (dispatch) => {
    dispatch({ type: GET_TODOS, payload: todo });
};

export const deleteTodo = (id) => (dispatch) => {
    dispatch({ type: DELETE_TODO, payload: id });
};
// module.exports = {
//     addTodo,
// };
