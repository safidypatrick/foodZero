import axios from 'axios';
import history from '@/history';
import store from '@/store';
import { userLogoutAttempt } from '@/redux/Auth/auth.action';

let base_url = null;

if (process.env.NODE_ENV === 'development') {
    base_url = process.env.REACT_APP_DEV_API;
} else if (process.env.NODE_ENV === 'production') {
    base_url = process.env.REACT_APP_PROD_API;
}

let instance = axios.create({
    baseURL: base_url
});

/**
 * Injecting token to axios instance
 */
instance.interceptors.request.use(config => {
    let token = null;

    const jwtToken = window.localStorage.getItem('jwtToken')

    if (jwtToken) {
        token = jwtToken;
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = null;
    }

    return config;
});

/**
 * Intercepting axios Unauthorized access
 */
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let status = null;

    if (error.response) {
        if (error.response.status) {
            status = error.response.status;
        }
    }

    if (401 === status) {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('user');
        store.dispatch(userLogoutAttempt());
    } else {
        return Promise.reject(error);
    }
});

export default instance;
