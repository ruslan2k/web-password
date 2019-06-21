import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import SignUp from './SignUp';
import { Menu } from 'semantic-ui-react';

const Login = () => <h1>Login</h1>;

class TopMenu extends React.Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu>
        <Menu.Item name='login' as={Link} to="/" active={activeItem === 'login'} onClick={this.handleItemClick}>
          Home
        </Menu.Item>
        <Menu.Item name='login' as={Link} to="/login" active={activeItem === 'login'} onClick={this.handleItemClick}>
          Login
        </Menu.Item>
        <Menu.Item name='signup' as={Link} to="/signup"  active={activeItem === 'signup'} onClick={this.handleItemClick}>
          Sign Up
        </Menu.Item>
      </Menu>
    )
  }
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <TopMenu />
      <Route exact path="/" component={App} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>
)

export default Root
