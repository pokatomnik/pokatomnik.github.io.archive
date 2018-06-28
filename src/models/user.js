import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';
import { push } from 'react-router-redux';
import {developerEmail} from '../constants';
import { setError } from './error';

export const branch = 'user';

const initialState = {
    email: undefined,
    isAdmin: false,
    name: undefined
};

export const selectUserEmail = (state) => state[branch].email;

export const selectUserIsAdmin = (state) => state[branch].isAdmin;

export const selectUserName = (state) => state[branch].name;

export const selectUserIsLogged = (state) => Boolean(selectUserEmail(state));

const setUserAction = createAction(`${branch}:setUser`);

const removeUserAction = createAction(`${branch}:removeUser`);

export const login = (email, password, goTo) => (dispatch, getState) => {
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
            if (goTo) {
                dispatch(push(goTo));
            }
        })
        .catch(() => {
            setError({
                title: 'Unable to authenticate',
                message: 'Your email and/or password is/are incorrect.'
            })(dispatch, getState);
        });
};

export const logout = (goTo) => (dispatch, getState) => {
    Backendless.UserService
        .logout()
        .then(() => {
            dispatch(removeUserAction());
            if (goTo) {
                dispatch(push(goTo));
            }
        })
        .catch(() => {
            setError({
                title: 'Unable to logout',
                message: 'Server error: unable to logout. Please try again later or report '
                    + developerEmail
            })(dispatch, getState);
        });
};

export const reducer = handleActions({
    [setUserAction]: (state, {email, isAdmin, name}) => ({...state, email, isAdmin, name}),

    [removeUserAction]: () => initialState
}, initialState);