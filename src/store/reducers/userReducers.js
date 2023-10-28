import { POST_USER } from '../type/todos';

const initialState = {
    user: null,
};

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case POST_USER:
            return {
                ...state,
                user: action.payload,
                // user: [...state.user, action.payload],
            };

        default:
            return state;
    }
};

export default userReducers;
