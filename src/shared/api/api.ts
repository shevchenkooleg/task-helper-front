import axios from 'axios';


export const $api = axios.create({
    baseURL: __API__,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        //config.headers.Authorization = `Bearer ${localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY)}` ?? '';
    }
    return config;
});

