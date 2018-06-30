import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import historyWatcher from './models/middleware/history-watcher';

import { branch as userBranch, reducer as userReducer } from './models/user';
import { branch as errorBranch, reducer as errorReducer } from './models/error';
import { branch as historyWatcherBranch, reducer as historyWatcherReducer } from './models/history-watcher';

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
            [historyWatcherBranch]: historyWatcherReducer,
            // router
            router: routerReducer,
        }),
        composeEnhancers(
            applyMiddleware(
                historyWatcher(),
                router,
                thunk
            )
        )
    );
}