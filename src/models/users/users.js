import {handleActions} from 'redux-actions';
import {
    // async action creators
    login,
    logout,
    retrieveCurrentUser,
    fetchLastPastas,
    rememberPasta,
    registerUser,
    resetPassword,
    removeLastPastaById,
    // sync action creators
    removeUser,
    setIsRetrieving,
    setLoggingIn,
    setLoggingOut,
    setUser,
    addPasta,
    setPastas,
    setIsFetchingPastas,
    forgetLastCreatedPasta,
    setIsRegistering,
    setIsResettingPassword,
    setIsRemovingLastPasta
} from './action-creators';
import {
    selectUserEmail,
    selectUserName,
    selectIsUserLoggedIn,
    selectIsUserLoggingIn,
    selectIsUserLoggingOut,
    selectIsUserRetrieving,
    selectGravatarUrl,
    selectLastPastas,
    selectIsFetchingPastas,
    selectIsRegistering,
    selectIsResettingPassword,
    selectIsRemovingLastPasta,
} from './selectors';
import {branch} from './constants';
import deepFreeze from '../../utils/deep-freeze';


const initialState = deepFreeze({
    email: null,
    name: null,
    loggingIn: false,
    loggingOut: false,
    isRetrieving: false,
    isFetchingPastas: false,
    isRegistering: false,
    isResettingPassword: false,
    isRemovingLastPasta: false,
    lastPastas: []
});

const reducer = handleActions({
    [setUser]: (state, {payload: {email, name}}) => ({...state, email, name}),

    [removeUser]: (state) => {
        const {email, name, lastPastas} = initialState;
        return {
            ...state,
            email,
            name,
            lastPastas
        };
    },

    [setLoggingIn]: (state, {payload: loggingIn}) => ({...state, loggingIn}),

    [setLoggingOut]: (state, {payload: loggingOut}) => ({...state, loggingOut}),

    [setIsRetrieving]: (state, {payload: isRetrieving}) => ({...state, isRetrieving}),

    [addPasta]: (state, {payload: pasta}) => ({
        ...state,
        lastPastas: [pasta, ...state.lastPastas]
    }),

    [forgetLastCreatedPasta]: (state) => {
        const lastPastas = state.lastPastas;
        lastPastas.shift();
        return {
            ...state,
            lastPastas: [...lastPastas]
        }
    },

    [setPastas]: (state, {payload: lastPastas}) => ({...state, lastPastas}),

    [setIsFetchingPastas]: (state, {payload: isFetchingPastas}) => ({
        ...state,
        isFetchingPastas
    }),

    [setIsRegistering]: (state, {payload: isRegistering}) => ({
        ...state,
        isRegistering
    }),

    [setIsResettingPassword]: (state, {payload: isResettingPassword}) => ({
        ...state,
        isResettingPassword
    }),

    [setIsRemovingLastPasta]: (state, {payload: isRemovingLastPasta}) => ({
        ...state,
        isRemovingLastPasta
    })
}, initialState);

export {
    reducer,
    branch,
    selectUserEmail,
    selectUserName,
    selectIsUserLoggedIn,
    selectIsUserLoggingIn,
    selectIsUserLoggingOut,
    selectIsUserRetrieving,
    selectGravatarUrl,
    selectLastPastas,
    selectIsFetchingPastas,
    selectIsRegistering,
    selectIsResettingPassword,
    selectIsRemovingLastPasta,
    login,
    logout,
    retrieveCurrentUser,
    addPasta,
    fetchLastPastas,
    rememberPasta,
    registerUser,
    resetPassword,
    removeLastPastaById
};
