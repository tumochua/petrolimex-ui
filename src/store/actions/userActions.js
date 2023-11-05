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
            localStorage.setItem('user', user);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
};

