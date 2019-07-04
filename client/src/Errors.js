import React from 'react';
import { connect } from 'react-redux';

const style = {
  backgroundColor: '#FF0000',
  color: 'white',
}

const Errors = props => {
  const error = props.error;
  // const isError = (Object.keys(error).length !== 0 && error.constructor === Object);
  return <div style={style}>{JSON.stringify(error)}</div>
}

const mapStateToProps = state => ({ error: state.error });

export default connect(mapStateToProps)(Errors);
