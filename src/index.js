import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Promise from 'bluebird';
import Backendless from 'backendless';
import 'whatwg-fetch';


const APP_ID = '018B2CDC-5E5C-A973-FF91-BF05D0515600';
const API_KEY = 'D7E605B3-57C4-82FB-FF55-6D3E8E08BD00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

// Bluebird is required for .finally Promise method
// (not supported in older browsers)
// And as a good Promise polyfill
window.Promise = Promise;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
