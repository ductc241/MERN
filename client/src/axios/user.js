const instance = require('./instance')

export const getUser = (token) => {
    const url = '/user/infor';

    return instance.get(url, {
        headers: { Authorization: token}
    })
}