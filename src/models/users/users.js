import {handleActions} from 'redux-actions';
import {
    // async action creators
    login,
    logout,
    retrieveCurrentUser,
    fetchLastPastas,
    rememberPasta,
    registerUser,
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
    setIsRegistering
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
    selectIsRegistering
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
    login,
    logout,
    retrieveCurrentUser,
    addPasta,
    fetchLastPastas,
    rememberPasta,
    registerUser
};
