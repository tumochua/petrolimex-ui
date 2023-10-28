import { CHANGE_LANGUAGE } from '../type/todos';

export const changeLanguage = (language) => (dispatch) => {
    dispatch({ type: CHANGE_LANGUAGE, payload: language });
};
