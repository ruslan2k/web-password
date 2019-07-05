import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class TopMenu extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const isLoggedIn = (this.props.user && this.props.user.isLoggedIn);
    const { activeItem } = this.state;
    if (this.props.user && this.props.user.isLoggedIn) {
      return (
        <Menu>
          <Menu.Item name='groups' as={Link} to="/groups" active={activeItem === 'groups'}
            onClick={this.handleItemClick}>Groups</Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu>
        <Menu.Item name='login' as={Link} to="/login" active={activeItem === 'login'} onClick={this.handleItemClick}>{'Login'}</Menu.Item>
        <Menu.Item name='signup' as={Link} to="/signup"  active={activeItem === 'signup'} onClick={this.handleItemClick}>{'Sign Up'}</Menu.Item>
        <Menu.Item name='groups' as={Link} to="/groups" active={activeItem === 'groups'}
          onClick={this.handleItemClick}>Groups</Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(TopMenu);
