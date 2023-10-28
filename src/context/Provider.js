import { useReducer } from 'react';

import Context from './Context';

import Reducer, { initState } from './reducers/Reducer';
// import LanguageReducer, { stateLanguage } from './reducers/LanguageReducer';
// import languageReducer, {initState} from './reducers/languageReducer'

function Provider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initState);

    // const [stateContextLanguage, dispatchLanguage] = useReducer(LanguageReducer, stateLanguage);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
