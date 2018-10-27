import {createAction, handleActions} from 'redux-actions';
import Backendless from 'backendless';
import memoize from 'lodash.memoize';
import md5 from 'md5';

import {setError} from './error';


export const branch = 'users';

const initialState = {
    email: null,
    name: null,
    loggingIn: false,
    loggingOut: false,
    isRetrieving: false
};

const setUser = createAction(`${branch}:setUser`);

const removeUser = createAction(`${branch}:removeUser`);

const setLoggingIn = createAction(`${branch}:setLoggingIn`);

const setLoggingOut = createAction(`${branch}:setLoggingOut`);

const setIsRetrieving = createAction(`${branch}:setIsRetrieving`);

export const selectUserEmail = (state) => state[branch].email;

export const selectUserName = (state) => state[branch].name;

export const selectIsUserLoggedIn = (state) => Boolean(selectUserEmail(state));

export const selectIsUserLoggingIn = (state) => state[branch].loggingIn;

export const selectIsUserLoggingOut = (state) => state[branch].loggingOut;

export const selectIsUserRetrieving = (state) => state[branch].isRetrieving;

export const selectGravatarUrl = memoize(
    // ?s={height}
    (state) => `https://www.gravatar.com/avatar/${md5(selectUserEmail(state))}?s=22`,
    (state) => selectUserEmail(state)
);

export const retrieveCurrentUser = () => (dispatch, getState) => {
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
            dispatch(setError('Can\'t retrieve current user', 'Please try to log in again'));
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

export const reducer = handleActions({
    [setUser]: (state, {payload: {email, name}}) => ({...state, email, name}),

    [removeUser]: (state) => ({...state, email: initialState.email, name: initialState.name}),

    [setLoggingIn]: (state, {payload: loggingIn}) => ({...state, loggingIn}),

    [setLoggingOut]: (state, {payload: loggingOut}) => ({...state, loggingOut}),

    [setIsRetrieving]: (state, {payload: isRetrieving}) => ({...state, isRetrieving})
}, initialState);
