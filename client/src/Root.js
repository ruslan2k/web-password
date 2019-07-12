import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import TopMenu from './TopMenu';
import SignUp from './SignUp';
import Errors from './Errors';
import Login from './Login';
import Groups from './containers/Groups';
import Logout from './containers/Logout';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <TopMenu />
      <Errors />
      <Route exact path="/" component={Home} />
      <Route path="/groups" component={Groups} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Router>
  </Provider>
)

export default Root
