import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import configureStore from './configureStore';
import Main from './components/main/main';

import './app.css';
import './react-bootstrap-fixes.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const history = createHistory({
    hashType: 'hashbang'
});
const store = configureStore(history);

export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Main />
            </ConnectedRouter>
        </Provider>
    );
};
