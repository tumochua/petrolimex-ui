import { SET_TODO_INPUT, ADD_TODO, CLEAR_INPUT, DELETE_TODO } from '../type/constants';

export const initState = {
    todos: [],
    todoInput: '',
};

function Reducer(state, actions) {
    switch (actions.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: actions.payload,
            };

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, actions.payload],
            };

        case CLEAR_INPUT:
            return {
                ...state,
                todoInput: '',
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.length > 0 && state.todos.filter((todo) => todo.id !== actions.payload),
            };

        default:
            throw new Error('Invalid actions');
    }
}

export default Reducer;
