import React from 'react';
import Backendless from 'backendless';
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

/* Setup the Backendless */
const APP_ID = '018B2CDC-5E5C-A973-FF91-BF05D0515600';
const API_KEY = 'D7E605B3-57C4-82FB-FF55-6D3E8E08BD00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);


export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Main />
            </ConnectedRouter>
        </Provider>
    );
};
