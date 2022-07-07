import rootReducer from '@/redux/rootReducer';
import thunk from 'redux-thunk';
import { tokenMiddleware } from '@/middleware';
import { createStore, applyMiddleware  } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk, tokenMiddleware));

export const hasGranted = (accessLevel) => {
    const user = store.getState().AuthReducer.user;

    return user.roles.includes(accessLevel);
}

export const notGranted = (accessLevel) => {
    const user = store.getState().AuthReducer.user;

    return !user.roles.includes(accessLevel);
}

export const checkRole = (roles) => {
    const user = store.getState().AuthReducer.user;

    if (!user.hasOwnProperty('roles')) {
        return false;
    }

    let hasRole = 0;
    roles.map(role => {
        if (user.roles.includes(role)) hasRole++;

        return role;
    })

    return hasRole > 0;
}

export const isTitulaire = () => {
    const user = store.getState().AuthReducer.user;

    if (!user.hasOwnProperty('roles')) {
        return false;
    }
    
    return user.roles.includes('ROLE_TITULAIRE');
}

export const isAdmin = () => {
    const user = store.getState().AuthReducer.user;

    if (!user.hasOwnProperty('roles')) {
        return false;
    }
    
    const isGerant = user.roles.includes('ROLE_GERANT');
    const isAdmin = user.roles.includes('ROLE_ADMIN');
    const isSuper = user.roles.includes('ROLE SUPER');
    return  (isGerant || isAdmin || isSuper);
}

export default store;