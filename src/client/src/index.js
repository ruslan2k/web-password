import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import * as crypto from 'crypto-browserify';
import { publicKey } from './publicKey.pem.js';

function todos(state = {}, action) {
  return state
}
const store = createStore(todos, {});

let encrypted = crypto.publicEncrypt(publicKey, Buffer('abcdef'));
encrypted.toString('hex');
// console.log(publicKey);
// console.log(encrypted.toString('hex'));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
