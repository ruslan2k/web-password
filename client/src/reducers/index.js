import { combineReducers } from 'redux';
import {
  SET_ERROR,
  REMOVE_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
} from '../actions/index';

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
    case USER_REQUEST:
    case USER_SUCCESS:
      return Object.assign({}, state, action.payload);
    case USER_FAILURE:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  error,
  user,
});
