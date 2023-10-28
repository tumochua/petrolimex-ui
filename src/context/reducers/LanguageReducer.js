import { CHANGE_LANGUAGE } from '../type/constants';

export const stateLanguage = {
    language: 'vi',
};

function LanguageReducer(state, actions) {
    switch (actions.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: actions.payload,
            };

        default:
            throw new Error('Invalid actions');
    }
}

export default LanguageReducer;
