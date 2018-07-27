import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Promise from 'bluebird';
import 'whatwg-fetch';

if (!window.Promise) {
    window.Promise = Promise;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
