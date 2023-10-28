import { useReducer } from 'react';

import Context from '../Context';

import UserReducer, { initState as initStateUser } from '../reducers/UserReducer';

// import LanguageReducer, { stateLanguage } from './reducers/LanguageReducer';
// import languageReducer, {initState} from './reducers/languageReducer'

function UserProvider({ children }) {
    const [stateUser, dispatchUser] = useReducer(UserReducer, initStateUser);

    // const [stateContextLanguage, dispatchLanguage] = useReducer(LanguageReducer, stateLanguage);

    return <Context.Provider value={[stateUser, dispatchUser]}>{children}</Context.Provider>;
}

export default UserProvider;
