let token = null;
let user = null;
let isAuthenticated = false;

const jwtToken = window.localStorage.getItem('jwtToken');
const userStorage = JSON.parse(window.localStorage.getItem('user'));
console.log(userStorage)
if (jwtToken) {
    token = jwtToken;
    isAuthenticated = true;
}

if (userStorage) {
    user = userStorage;
}

const initialState = {
    token,
    user,
    isAuthenticated,
    isAuthenticating: false,
    error: null
}

const AuthReducer = (state = initialState, action) => {
    let newUser = {
        ...state.user,
    }

    switch (action.type) {
        case 'AUTH_LOGIN_REQUEST':
            return {
                ...state,
                isAuthenticating: true
            }

        case 'AUTH_LOGIN_ERROR':
            return {
                ...state,
                isAuthenticating: false,
                error: action.error
            }

        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuthenticated: true,
                isAuthenticating: false
            }

        case 'AUTH_REFRESH_USER':
                return {
                    ...state,
                    user: action.user
                }

        case 'AUTH_LOGOUT_SUCCESS':
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isAuthenticating: false
            }

        case 'USER_UPDATE_SETUP':
            newUser = {
                ...newUser,
                setup: action.setup
            }

            window.localStorage.setItem('user', JSON.stringify(newUser));
            
            return {
                ...state,
                user: newUser
            }

        case 'USER_UPDATE_BOUTIQUE':
            newUser = {
                ...newUser,
                defaultBoutique: action.boutiqueId
            }

            console.log(`newUser`, newUser);

            window.localStorage.setItem('user', JSON.stringify(newUser));
            
            return {
                ...state,
                user: newUser
            }
            
        default: 
            return state
    }
}

export default AuthReducer;