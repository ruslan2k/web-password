import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button } from 'semantic-ui-react';
import { fetchGroups } from './actions';

class Home extends Component {
  componentDidMount() {
    const isLoggedIn = this.props.user.isLoggedIn;
    if (isLoggedIn) {
      this.props.fetchGroups();
    }
  }
  render() {
    const isLoggedIn = this.props.user.isLoggedIn;
    if (!isLoggedIn) {
      return <Redirect to='/login' />;
    }
    const groups = this.props.groups.map(group => <Button key={group.id}>{group.name}</Button>);
    return (
      <div>
        <h1>Groups</h1>
        {groups}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, groups: state.groups });
const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
