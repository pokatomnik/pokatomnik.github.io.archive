import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';

import { developerEmail } from '../constants';
import { setError } from './error';
import { selectGoBackPath, push } from './history-watcher';

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

export const selectLoggingIn = (state) => state[branch].loggingIn;

export const selectLoggingOut = (state) => state[branch].loggingOut;

const setUserAction = createAction(`${branch}:setUser`);

const removeUserAction = createAction(`${branch}:removeUser`);

const setLoggingIn = createAction(`${branch}:setLoggingIn`);

const setLoggingOut = createAction(`${branch}:setLoggingOut`);

const FALLBACK_ROUTE = '/';

export const login = (email, password, goTo) => (dispatch, getState) => {
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
            if (goTo) {
                push(goTo)(dispatch, getState);
            } else {
                const goBackPath = selectGoBackPath(getState());
                push(goBackPath ? goBackPath : FALLBACK_ROUTE)(dispatch, getState);
            }
        })
        .catch(() => {
            dispatch(setLoggingIn(false));
            setError({
                title: 'Unable to authenticate',
                message: 'Your email and/or password is/are incorrect.'
            })(dispatch, getState);
        });
};

export const logout = (goTo) => (dispatch, getState) => {
    dispatch(setLoggingOut(true));
    Backendless.UserService
        .logout()
        .then(() => {
            dispatch(removeUserAction());
            dispatch(setLoggingOut(false));
            if (goTo) {
                push(goTo)(dispatch, getState);
            } else {
                const goBackPath = selectGoBackPath(getState());
                push(goBackPath ? goBackPath : FALLBACK_ROUTE)(dispatch, getState);
            }
        })
        .catch(() => {
            dispatch(setLoggingOut(false));
            setError({
                title: 'Unable to logout',
                message: 'Server error: unable to logout. Please try again later or report '
                    + developerEmail
            })(dispatch, getState);
        });
};

export const reducer = handleActions({
    [setUserAction]: (state, {payload: {email, isAdmin, name}}) => ({...state, email, isAdmin, name}),

    [removeUserAction]: () => initialState,

    [setLoggingIn]: (state, {payload: loggingIn}) => ({...state, loggingIn}),

    [setLoggingOut]: (state, {payload: loggingOut}) => ({...state, loggingOut})
}, initialState);