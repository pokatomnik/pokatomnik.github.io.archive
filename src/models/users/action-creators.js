import Backendless from 'backendless';
import isObject from 'lodash.isobject';
import {push} from 'react-router-redux';
import {createAction} from 'redux-actions';

import {setError} from '../error/error';
import {branch} from './constants';
import {selectUserEmail} from './selectors';

export const setUser = createAction(`${branch}:setUser`);

export const removeUser = createAction(`${branch}:removeUser`);

export const setLoggingIn = createAction(`${branch}:setLoggingIn`);

export const setLoggingOut = createAction(`${branch}:setLoggingOut`);

export const setIsRetrieving = createAction(`${branch}:setIsRetrieving`);

export const retrieveCurrentUser = () => (dispatch) => {
    if (!getTokenExists) {
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
            // we must not continue displaying a content which may be related
            // to another user
            // TODO: cleanup user pastas
            dispatch(push('/'));
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
        })
        .catch(() => {
            dispatch(setLoggingOut(false));
            dispatch(setError('Unable to logout', 'Please try again later'));
        });
}

// Helpers
function purgeToken() {
    localStorage.removeItem('Backendless');
}

function getTokenExists() {
    const authData = localStorage.get('Backendless');
    if (!authData) {
        return false;
    }
    let parsedAuthData;
    try {
        parsedAuthData = JSON.parse(authData);
    } catch (e) {
        return false;
    }

    if (!isObject(parsedAuthData) || !parsedAuthData['user-token']) {
        return false;
    }

    return true;
}