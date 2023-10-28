import { useContext } from 'react';

import Context from '@/context/Context';

export const useContextStore = () => {
    const [state, dispatch] = useContext(Context);
    // const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};

// export const userConTextStoreUser = () => {
//     const [userInfor, setUserInfor] = useContext(Context);
//     return [userInfor, setUserInfor];
// };
