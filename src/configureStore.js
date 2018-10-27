import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import thunk from 'redux-thunk';

import {branch as errorBranch, reducer as errorReducer} from './models/error/error';
import {branch as usersBranch, reducer as usersReducer} from './models/users/users';
import {branch as routerBranch} from './models/router/router';
import {branch as toastrBranch} from './models/toastr/toastr';


let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default (history) => {
    const router = routerMiddleware(history);
    return createStore(
        combineReducers({
            // My reducers
            [usersBranch]: usersReducer,
            [errorBranch]: errorReducer,
            // Third party reducers
            [routerBranch]: routerReducer,
            [toastrBranch]: toastrReducer
        }),
        composeEnhancers(
            applyMiddleware(
                router,
                thunk
            )
        )
    );
}