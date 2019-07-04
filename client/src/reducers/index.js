import { combineReducers } from 'redux';
import {
  SET_ERROR,
  REMOVE_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  GROUPS_SUCCESS,
  GROUPS_FAILURE,
} from '../actions';

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

function groups (state = [], action) {
  switch (action.type) {
    case GROUPS_SUCCESS:
      return action.payload;
    case GROUPS_FAILURE:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  error,
  groups,
  user,
});
