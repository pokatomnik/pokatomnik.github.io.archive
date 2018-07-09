import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { branch as userBranch, reducer as userReducer } from './models/user';
import { branch as errorBranch, reducer as errorReducer } from './models/error';
import { branch as pastasBranch, reducer as pastasReducer } from './models/pastas';
import { branch as routerBranch } from './models/router';

let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default (history) => {
    const router = routerMiddleware(history);
    return createStore(
        combineReducers({
            // my reducers
            [userBranch]: userReducer,
            [errorBranch]: errorReducer,
            [pastasBranch]: pastasReducer,
            // router
            [routerBranch]: routerReducer,
        }),
        composeEnhancers(
            applyMiddleware(
                router,
                thunk
            )
        )
    );
}