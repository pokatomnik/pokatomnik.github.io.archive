import {handleActions} from 'redux-actions';
import {
    // async action creators
    login,
    logout,
    retrieveCurrentUser,
    // sync action creators
    removeUser,
    setIsRetrieving,
    setLoggingIn,
    setLoggingOut,
    setUser
} from './action-creators';
import {
    selectUserEmail,
    selectUserName,
    selectIsUserLoggedIn,
    selectIsUserLoggingIn,
    selectIsUserLoggingOut,
    selectIsUserRetrieving,
    selectGravatarUrl
} from './selectors';
import {branch} from './constants';


const initialState = {
    email: null,
    name: null,
    loggingIn: false,
    loggingOut: false,
    isRetrieving: false
};

const reducer = handleActions({
    [setUser]: (state, {payload: {email, name}}) => ({...state, email, name}),

    [removeUser]: (state) => ({...state, email: initialState.email, name: initialState.name}),

    [setLoggingIn]: (state, {payload: loggingIn}) => ({...state, loggingIn}),

    [setLoggingOut]: (state, {payload: loggingOut}) => ({...state, loggingOut}),

    [setIsRetrieving]: (state, {payload: isRetrieving}) => ({...state, isRetrieving})
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
    login,
    logout,
    retrieveCurrentUser
}
