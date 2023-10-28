import { CHANGE_LANGUAGE } from '../type/todos';

export const initialState = {
    language: 'vi',
};

const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
                // user: [...state.user, action.payload],
            };

        default:
            return state;
    }
};

export default LanguageReducer;
