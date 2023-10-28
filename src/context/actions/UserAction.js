import { GET_USER_INFOR } from '../type/constants';

export const getUserInfor = (payload) => {
    return {
        type: GET_USER_INFOR,
        payload,
    };
};
