import { ADD_TODO, GET_TODOS, DELETE_TODO } from '../type/todos';

const initialState = {
    todos: [
        // {
        //     id: 1,
        //     title: 'delectus aut autem',
        //     completed: false,
        // },
        // {
        //     id: 2,
        //     title: 'quis ut nam facilis et officia qui',
        //     completed: false,
        // },
        // {
        //     id: 3,
        //     title: 'fugiat veniam minus',
        //     completed: false,
        // },
    ],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };

        case GET_TODOS:
            return {
                ...state,
                todos: state.todos,
            };

        case DELETE_TODO:
            console.log(action);
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };

        default:
            return state;
    }
};

export default todoReducer;
