import Backendless from 'backendless';
import isObject from 'lodash.isobject';
import {push} from 'react-router-redux';
import {createAction} from 'redux-actions';
import {actions as toastrActions} from 'react-redux-toastr';

import {setError} from '../error/error';
import {branch} from './constants';
import {selectUserEmail} from './selectors';

// LocalStorage Backendless key
const LS_BACKENDLESS = 'Backendless';
const TOKEN_KEY = 'user-token';
const PASTAS_COUNT_PER_USER = 50;

export const setUser = createAction(`${branch}:setUser`);

export const removeUser = createAction(`${branch}:removeUser`);

export const setLoggingIn = createAction(`${branch}:setLoggingIn`);

export const setLoggingOut = createAction(`${branch}:setLoggingOut`);

export const setIsRetrieving = createAction(`${branch}:setIsRetrieving`);

export const setIsRegistering = createAction(`${branch}:setIsRegistering`);

export const addPasta = createAction(`${branch}:addPasta`, (pasta) => ({
    ...pasta,
    created: Date.now()
}));

export const forgetLastCreatedPasta = createAction(`${branch}:removeLastCreatedPasta`);

export const setPastas = createAction(`${branch}:setPastas`);

export const setIsFetchingPastas = createAction(`${branch}:setIsFetchingPastas`);

export const setIsResettingPassword = createAction(`${branch}:setIsResettingPassword`);

export const resetPassword = (email) => (dispatch) => {
    dispatch(setIsResettingPassword(true));
    Backendless.UserService
        .restorePassword(email)
        .then(() => {
            dispatch(toastrActions.add({
                type: 'light',
                title: 'Password reset',
                message: `Please check ${email}`,
                options: {
                    showCloseButton: true,
                }
            }));
        })
        .catch((err) => {
            console.error(err);
            dispatch(setError(
                'Error resetting password',
                'Please make sure you typed correct email or try again later'
            ));
        })
        .finally(() => {
            dispatch(setIsResettingPassword(false));
        });
};

export const registerUser = ({
    name,
    email,
    password
}) => (dispatch) => {
    const newUser = new Backendless.User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    dispatch(setIsRegistering(true));
    Backendless.UserService
        .register(newUser)
        .then(() => {
            dispatch(push('/registration/check-email'));
        })
        .catch(() => {
            dispatch(setError(
                'Unable to signup',
                'Please try again later and leave a feedback'
            ));
        })
        .finally(() => {
            dispatch(setIsRegistering(false));
        });
}

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

export const rememberPasta = ({encrypted, name, url}) => async (dispatch) => {
    try {
        await removeTheOldestPastaIfLimitExceeded(PASTAS_COUNT_PER_USER);
    } catch (e) {
        // okay-face.jpg
    }
    dispatch(addPasta({encrypted, name, url}));
    try {
        await Backendless.Data
            .of('Pastas')
            .save({encrypted, name, url});
        // TODO: make retrying here
        dispatch(fetchLastPastas());
    } catch (e) {
        dispatch(forgetLastCreatedPasta());
    }
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

function getPastasCount() {
    return Backendless.Data.of('Pastas').getObjectCount();
}

function getOldestPasta() {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(['created']);
    return Backendless.Data.of('Pastas').findFirst(queryBuilder);
}

function removePasta(objectId) {
    return Backendless.Data.of('Pastas').remove({objectId});
}

async function removeTheOldestPastaIfLimitExceeded(limit) {
    const pastasCount = await getPastasCount();
    if (pastasCount < limit) {
        return;
    }
    const {objectId: objectIdOfOldestPasta} = await getOldestPasta();
    await removePasta(objectIdOfOldestPasta);
    return;
}
