// import { useNavigate } from 'react-router-dom';

import { handleApiLogin } from '../../services/apis';

import { POST_USER } from '../type/todos';

// import config from '@/config';

export const createUser = (user) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        const response = await handleApiLogin(user);
        // console.log(response);
        const result = response.data;
        if (result.statusCode === 2) {
            await dispatch({ type: POST_USER, payload: result });
            const user = JSON.stringify(result.user);
            const roleId = JSON.stringify(result.user?.roleId);
            localStorage.setItem('user', user);
            if (roleId) {
                localStorage.setItem('roleId', roleId)
            }
        }
        return response;
    } catch (error) {
        console.log(error);
    }
};

