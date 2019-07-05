import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, List } from 'semantic-ui-react';
import { fetchGroups } from '../actions';

const GroupList = () => <h2>{'Group List'}</h2>;
const GroupInfo = () => <h2>{'Group Info'}</h2>;

class Groups extends Component {
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
        <Route exact path="/groups" component={GroupList} />
        <Route path="/groups/:id" component={GroupInfo} />
        <List link>
          {groups}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, groups: state.groups });
const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
