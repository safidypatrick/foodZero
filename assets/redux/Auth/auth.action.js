import axios from '@/axios';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';

export const USER_UPDATE_SETUP = 'USER_UPDATE_SETUP';
export const USER_UPDATE_BOUTIQUE = 'USER_UPDATE_BOUTIQUE';

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST
});

export const authLoginError = (error) => ({
    type: AUTH_LOGIN_ERROR,
    error
});

export const authLoginSuccess = (token, user) => ({
    type: AUTH_LOGIN_SUCCESS,
    token,
    user
});

export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        dispatch(authLoginRequest());
        return axios.post('/auth/login', {
            username: username,
            password: password
        }).then(response => {
            if (response) {
                const token = response.data.token;
                const user = response.data.user ? response.data.user : null;

                

                dispatch((authLoginSuccess(token, user)))
                // console.log(history.location.pathname);

                const redirect_if = ['/login', '/'];
                if (redirect_if.includes(history.location.pathname)) {
                    history.push('/decaissement/demande');
                }
            } else {
                const message = 'Utilisateur ou mot de passe incorrect';

                dispatch((authLoginError(message)))
            }
        }).catch(error => {
            let status = null;

            if (error.response) {
                if (error.response.status) {
                    status = error.response.status;
                }
            }

            // console.log('/auth/login[error]', error);
            
            let message = '';

            if (401 === status) {
                message = 'Utilisateur ou mot de passe incorrect';
            } else if (500 === status) {
                message = 'Une erreur est survenue. Réessayer à nouveau !';
            }
            
            dispatch((authLoginError(message)))
        })
    }
}

export const userSetToken = (token, user) => {
    
    return (dispatch) => {
        return dispatch((authLoginSuccess(token, user)))
    }
}

export const userLogoutAttempt = () => {
    return (dispatch) => {
        const promise = (dispatch) => new Promise((resolve, reject) => {
            window.localStorage.removeItem('jwtToken');
            window.localStorage.removeItem('user');
            dispatch(authLogoutSuccess());
    
            return resolve(true) 
        })
        
        return promise(dispatch);
    }
};

export const AUTH_REFRESH_USER = 'AUTH_REFRESH_USER';

export const authRefreshUser = (user) => {
    return {
        type: AUTH_REFRESH_USER,
        user
    }
}

export const userUpdateSetup = (setup) => ({
    type: USER_UPDATE_SETUP,
    setup
})

export const fetchUserSetup = (setup) => {
    return (dispatch) => {
        dispatch(userUpdateSetup(setup))
    }
}

export const userUpdateBoutique = (boutiqueId) => ({
    type: USER_UPDATE_BOUTIQUE,
    boutiqueId
})

export const fetchUserBoutique = (boutiqueId) => {
    return (dispatch) => {
        dispatch(userUpdateBoutique(boutiqueId))
    }
}