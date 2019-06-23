import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './App';
import TopMenu from './TopMenu';
import SignUp from './SignUp';
import Errors from './Errors';
import Login from './Login';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <TopMenu />
      <Errors />
      <Route exact path="/" component={App} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>
)

export default Root
