import setToken from '@/axios';

export const tokenMiddleware = () => next => action => {
    switch (action.type) {
        case 'AUTH_LOGIN_SUCCESS':
            window.localStorage.setItem('jwtToken', action.token);
            window.localStorage.setItem('user', JSON.stringify(action.user));
            setToken(action.token);
            break;
        default:
    }

    next(action);
}