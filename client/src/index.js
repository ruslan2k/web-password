import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import * as crypto from 'crypto-browserify';
import reducer from './reducers/index';
import apiMiddleware from './middleware/api';
import { publicKey } from './publicKey.pem.js';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk, apiMiddleware)
)

let encrypted = crypto.publicEncrypt(publicKey, Buffer('abcdef'));
encrypted.toString('hex');
// console.log(publicKey);
// console.log(encrypted.toString('hex'));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
