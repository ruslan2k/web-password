import { combineReducers } from 'redux';

function user (state = {}, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  user,
})
