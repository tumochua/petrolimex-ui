import axios from 'axios';
// import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    // timeout: 1000,
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    // },
});

export const getListUsers = () => {
    // console.log(Cookies.get('accessToken'));
    return api.get('/api-get-all-users');
};

export const handRegisterUser = (user) => {
    return api.post('/api-register-user', user);
};

export const handleApiLogin = (user) => {
    return api.post('/api-login', user);
};

export const apiGetProfileUser = () => {
    return api.get(`/api-get-user-by-id`);
};

export const apiCreateNotification = (notification) => {
    return api.post('/api-crate-notification', notification)
}

export const apiCreateShift = (shift) => {
    return api.post('/api-create-shifts', shift)
}

export const apiDeletUser = (userId) => {
    return api.delete('/api-delete-user', { data: { userId } })
}

export const handleApiEditUser = (userData) => {
    // console.log('check userData', userData);
    // return api.put('/api-edit-user', userData);
};

export const handleApiCreateFamily = (family) => {
    // return api.post('/api-create-family', family);
};
export const apiGetListStudentOfClass = (className) => {
    // console.log('check className', className);
    // return api.get(`/api-list-students-of-class?className=${className}`);
};

export const apiCreatePost = (post) => {
    // return api.post('/api-create-post', post);
};

export const apiGetListPosts = (page) => {
    // return api.get(`/api-get-list-posts?page=${page}`);
};

export const apiGetDetailPost = (postId) => {
    // console.log('postId', postId);
    // return api.get(`/api-get-detail-post-by-id?postId=${postId}`);
};

export const apiLikePost = (postId) => {
    // console.log('postId', postId);
    // {
    //     data: {
    //         id: userId
    //     }
    // return api.put('/api-like-post', postId);
};

export const apiQuitLikePosts = (postsId) => {
    // console.log('posts', postsId);
    // return api.delete('/api-quit-like-post', {
    //     data: postsId,
    // });
};

export const apiSearchPosts = (value, type) => {
    // console.log(type);
    // return api.get(`/api-search-posts`, {
    //     params: {
    //         value,
    //         type,
    //     },
    // });
};

export const apiGetAllPostsByUser = () => {
    // return api.get('/api-get-all-posts-by-user');
};

export const apiDeletePosts = (postsData) => {
    // return api.delete('/api-delete-posts', {
    //     data: { postsData },
    // });
};

export const apiEditPosts = (postId, editPosts) => {
    // return api.put('/api-edit-posts-by-user', { postId, editPosts });
};

export const apiVerifyPosts = (status) => {
    // console.log(status);
    // return api.get('/api-get-verify-posts', {
    //     params: {
    //         status,
    //     },
    // });
};

export const apiConfirmPosts = (status) => {
    // return api.put('/api-confirm-posts', { status });
};
export const apiGetListNotification = () => {
    // return api.get('/api-list-notification');
};

export const apiCleanNotification = () => {
    // return api.put('/api-clean-notification');
};

export const apiSeeAllNotification = () => {
    // return api.get('/api-list-see-all-notification');
};

export const apiCreateComment = (data) => {
    // return api.post('/api-create-comment', data);
};

export const apiGetListCommentPost = (postId) => {
    // return api.get('/api-get-list-comments', { params: { postId } });
};

export const apiEditComment = (data) => {
    // console.log(data);
    // return api.put('/api-eidt-comment', data);
};

export const apiDeleteComment = (data) => {
    // return api.delete('/api-delete-comment', {
    //     data,
    // });
};

export const apiLikeComment = (data) => {
    return api.put('/api-likes-comment', data);
};

export const apiGetAllPosts = (valueSort) => {
    return api.get('/api-get-all-posts', {
        params: {
            data: valueSort,
        },
    });
};

export const apiGetAllStudentManage = (currentUser) => {
    return api.get('/api-get-all-student-manage', {
        params: {
            currentUser,
        },
    });
};

// export const apiManageGetUserById = (userId) => {
//     return api.get('/api-get-user-by-id', {
//         params: {
//             userId,
//         },
//     });
// };

export const apiManageEditUser = (data) => {
    return api.put('/api-manage-eidt-user', data);
};
export const apiManageDeleteUser = (userId) => {
    return api.delete('/api-manage-delete-user', {
        data: { userId },
    });
};

export const apiManageGetDetailUser = (userId) => {
    return api.get('/api-manage-get-detail-user', {
        params: {
            userId,
        },
    });
};

export const apiManageGetALlTeacher = () => {
    return api.get('/api-get-all-teachers');
};
