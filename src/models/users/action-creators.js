import Backendless from 'backendless';
import isObject from 'lodash.isobject';
import {push} from 'react-router-redux';
import {createAction} from 'redux-actions';

import {setError} from '../error/error';
import {branch} from './constants';
import {selectUserEmail} from './selectors';

// LocalStorage Backendless key
const LS_BACKENDLESS = 'Backendless';
const TOKEN_KEY = 'user-token';

export const setUser = createAction(`${branch}:setUser`);

export const removeUser = createAction(`${branch}:removeUser`);

export const setLoggingIn = createAction(`${branch}:setLoggingIn`);

export const setLoggingOut = createAction(`${branch}:setLoggingOut`);

export const setIsRetrieving = createAction(`${branch}:setIsRetrieving`);

export const addPasta = createAction(`${branch}:addPasta`, (pasta) => ({
    ...pasta,
    created: Date.now()
}));

export const forgetLastCreatedPasta = createAction(`${branch}:removeLastCreatedPasta`);

export const setPastas = createAction(`${branch}:setPastas`);

export const setIsFetchingPastas = createAction(`${branch}:setIsFetchingPastas`);

export const retrieveCurrentUser = () => (dispatch) => {
    if (!getTokenExists()) {
        return;
    }
    dispatch(setIsRetrieving(true));
    Backendless.Users
        .getCurrentUser()
        .then((user) => {
            dispatch(setIsRetrieving(false));
            if (!user) {
                // User is not logged In
                return;
            }
            const {name, email} = user;
            dispatch(setUser({email, name}));
            dispatch(fetchLastPastas());
        })
        .catch(() => {
            dispatch(setIsRetrieving(false));
            // Token is probably outdated, get rid of It
            purgeToken();
        });
};

export const login = (email, password) => (dispatch, getState) => {
    if (selectUserEmail(getState())) {
        return;
    }

    dispatch(setLoggingIn(true));
    Backendless.UserService
        // email, password, stayLoggedIn = true
        // Backendless.Users.getCurrentUser() for further user info requests
        .login(email, password, true)
        .then(({email, name}) => {
            dispatch(setLoggingIn(false));
            dispatch(setUser({email, name}));
            dispatch(fetchLastPastas());
        })
        .catch(() => {
            dispatch(setLoggingIn(false));
            dispatch(setError('Unable to login', 'Email or password is incorrect'));
        });
}

export const logout = () => (dispatch, getState) => {
    if (!selectUserEmail(getState())) {
        return;
    }

    dispatch(setLoggingOut(true));
    Backendless.UserService
        .logout()
        .then(() => {
            dispatch(setLoggingOut(false));
            dispatch(removeUser());
            // we must not continue displaying a content which may be related
            // to another user
            // TODO: cleanup user pastas
            dispatch(push('/'));
        })
        .catch(() => {
            dispatch(setLoggingOut(false));
            dispatch(setError('Unable to logout', 'Please try again later'));
        });
}

export const fetchLastPastas = () => (dispatch) => {
    dispatch(setIsFetchingPastas(true));
    const queryBuilder = Backendless.DataQueryBuilder.create();
    // only these fields must be fetched
    // TODO: create query string from keys of schema
    queryBuilder.setProperties('encrypted, name, url, created');
    queryBuilder.setSortBy(['created DESC']);
    Backendless.Data
        .of('Pastas')
        .find(queryBuilder)
        .then((pastas) => {
            dispatch(setIsFetchingPastas(false));
            // we have to remove 'objectId's and '___class' fields here
            dispatch(setPastas(pastas.map(preparePastas)));
        })
        .catch(() => {
            // TODO: implement retrying here
            dispatch(setIsFetchingPastas(false));
            dispatch(setError('Error fetching last pastas', 'Please try refresh this page later'));
        });
};

export const rememberPasta = ({encrypted, name, url}) => (dispatch) => {
    dispatch(addPasta({encrypted, name, url}));
    Backendless.Data
        .of('Pastas')
        .save({encrypted, name, url})
        .then(() => {
            // TODO: make retrying here
            dispatch(fetchLastPastas());
        })
        .catch(() => {
            dispatch(forgetLastCreatedPasta());
        });
}

// Helpers
function preparePastas({encrypted, name, url, created}) {
    return {encrypted, name, url, created};
}

function purgeToken() {
    localStorage.removeItem(LS_BACKENDLESS);
}

function getTokenExists() {
    const authData = localStorage.getItem(LS_BACKENDLESS);
    if (!authData) {
        return false;
    }
    let parsedAuthData;
    try {
        parsedAuthData = JSON.parse(authData);
    } catch (e) {
        return false;
    }

    if (!isObject(parsedAuthData) || !parsedAuthData[TOKEN_KEY]) {
        return false;
    }

    return true;
}