import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import SignUp from './SignUp';
import { Menu } from 'semantic-ui-react';

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
    </Router>
  </Provider>
)

export default Root
