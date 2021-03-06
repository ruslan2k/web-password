import React from 'react';
import { compose, applyMiddleware, createStore } from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers/index';
import apiMiddleware from './middleware/api';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, logger, apiMiddleware),
    persistState()
  )
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
