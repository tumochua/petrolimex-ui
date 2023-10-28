import { useContext } from 'react';

import Context from '@/context/Context';

export const useContextStore = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};
