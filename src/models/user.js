import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';
import { push } from 'react-router-redux';

import { developerEmail } from '../constants';
import { setError } from './error';

export const branch = 'user';

const initialState = {
    email: undefined,
    isAdmin: false,
    name: undefined,
    loggingIn: false,
    loggingOut: false
};

export const selectUserEmail = (state) => state[branch].email;

export const selectUserIsAdmin = (state) => state[branch].isAdmin;

export const selectUserName = (state) => state[branch].name;

export const selectUserIsLoggedIn = (state) => Boolean(selectUserEmail(state));

export const selectUserLoggingIn = (state) => state[branch].loggingIn;

export const selectUserLoggingOut = (state) => state[branch].loggingOut;

const setUserAction = createAction(`${branch}:setUser`);

const removeUserAction = createAction(`${branch}:removeUser`);

const setLoggingIn = createAction(`${branch}:setLoggingIn`);

const setLoggingOut = createAction(`${branch}:setLoggingOut`);

export const login = (email, password, silent = false) => (dispatch, getState) => {
    dispatch(setLoggingIn(true));
    Backendless.UserService
        .login(email, password)
        .then(({
            email,
            isAdmin,
            name
        }) => {
            dispatch(setUserAction({
                email,
                isAdmin,
                name
            }));
            dispatch(setLoggingIn(false));
            if (!silent) {
                dispatch(push('/'));
            }
        })
        .catch(() => {
            dispatch(setLoggingIn(false));
            setError(
                'Unable to authenticate', 'Invalid credentials.'
            )(dispatch, getState);
        });
};

export const logout = () => (dispatch, getState) => {
    dispatch(setLoggingOut(true));
    Backendless.UserService
        .logout()
        .then(() => {
            dispatch(removeUserAction());
            dispatch(setLoggingOut(false));
            dispatch(push('/'));
        })
        .catch(() => {
            dispatch(setLoggingOut(false));
            setError(
                'Unable to logout',
                'Server error: unable to logout. Please try again later or report '
                + developerEmail
            )(dispatch, getState);
        });
};

export const reducer = handleActions({
    [setUserAction]: (state, {payload: {email, isAdmin, name}}) => ({...state, email, isAdmin, name}),

    [removeUserAction]: () => initialState,

    [setLoggingIn]: (state, {payload: loggingIn}) => ({...state, loggingIn}),

    [setLoggingOut]: (state, {payload: loggingOut}) => ({...state, loggingOut})
}, initialState);