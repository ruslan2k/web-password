import { combineReducers } from 'redux';
import { SET_ERROR, REMOVE_ERROR, SET_USER } from '../actions/index';

function error (state = {}, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    case REMOVE_ERROR:
      return {}
    default:
      return state
  }
}

function user (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  error,
  user,
});
