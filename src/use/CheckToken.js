export const useCheckToken = (data) => {
    if (data) {
        const result = data.data;
        return result.statusCode && result.message === 'invalid token' ? true : false;
    }
};
