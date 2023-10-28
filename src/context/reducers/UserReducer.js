import { GET_USER_INFOR } from '../type/constants';

export const initState = {
    userInfor: null,
};

function UserReducer(state, actions) {
    switch (actions.type) {
        case GET_USER_INFOR:
            return {
                ...state,
                userInfor: actions.payload,
            };

        default:
            throw new Error('Invalid actions');
    }
}

export default UserReducer;
