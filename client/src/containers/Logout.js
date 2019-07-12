import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, List } from 'semantic-ui-react';
import { userFetch } from '../actions';

class Logout extends Component {
  render() {
    // this.props.userFetch()
    return (
      <div>
        <h1>Logout</h1>
        <Button onClick={() => this.props.userFetch()}>Logout</Button>
      </div>
    )
  }
}

class xxxx extends Component {
  componentDidMount() {
    const isLoggedIn = this.props.user.isLoggedIn;
    if (isLoggedIn) {
      this.props.fetchGroups();
    }
  }
  render() {
    const groups = this.props.groups.map(group => {
      return <List.Item as={Link} to={"/groups/" + group.id} key={group.id}>{group.name}</List.Item>;
    });
    return (
      <div>
        <h1>Groups</h1>
      {/*
        <Route exact path="/groups" component={GroupList} />
        <Route path="/groups/:id" component={GroupInfo} />
        */}
        <List link>
          {groups}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, groups: state.groups });
const mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetch()),
  // fetchGroups: () => dispatch(fetchGroups()),
});

export default connect(null, mapDispatchToProps)(Logout);
