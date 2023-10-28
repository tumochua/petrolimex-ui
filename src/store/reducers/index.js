import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReduces from './userReducers';
import LanguageReducer from './LanguageReducer';
const rootReducer = combineReducers({
    myTodos: todoReducer,
    users: userReduces,
    language: LanguageReducer,
});

export default rootReducer;
