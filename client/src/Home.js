import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchGroups } from './actions';

function Home (props) {
  const isLoggedIn = props.user.isLoggedIn;
  if (isLoggedIn) {
    props.fetchGroups();
  }
  return (isLoggedIn) ? (
    <div>
      <h1>Home</h1>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
