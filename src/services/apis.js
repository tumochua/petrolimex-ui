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

export const apiGetUserById = (userId) => {
    return api.get(`/api-get-use-of-id?userId=${userId}`)
}

export const apiCreateNotification = (notification) => {
    return api.post('/api-crate-notification', notification)
}

export const apiCreateShift = (shift) => {
    return api.post('/api-create-shifts', shift)
}

export const apiDeletUser = (userId) => {
    return api.delete('/api-delete-user', { data: { userId } })
}

export const apiCreateTimeKeeing = (timekeeping) => {
    return api.post('/api-create-timekeeping', timekeeping)
}

export const apiGetAllTimeKeeing = (roleId) => {
    return api.get(`/api-get-list-timekeeing?roleId=${roleId}`)
}

export const apiCountSalary = (salary) => {
    return api.post('/api-count-salary', salary)
}

export const apiGetAllSalary = (roleId) => {
    return api.get(`/api-get-all-salary?roleId=${roleId}`)
}

export const apiEditRole = (role, userId) => {
    return api.put('/api-edit-role', { role, userId })
}

export const apiGetAllNotification = () => {
    return api.get('/api-get-all-notification')
}

export const apiCreateSales = (sale) => {
    return api.post('/api-create-sale', sale)
}

export const apiGetAllSales = (roleId) => {
    return api.get(`/api-get-all-sales?roleId=${roleId}`)
}

export const apiResetSales = (time) => {
    return api.post('/api-reset-sales', time)
}

export const apiEditUserById = (users) => {
    return api.put('/api-edit-user', { users })
}

export const apiCreateReport = (reportFile) => {
    return api.post('/api-create-report', reportFile)
}