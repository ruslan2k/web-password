import { API } from '../middleware/api'

export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const userRegister = (email, password) => ({
  type: API,
  payload: {
    url: '/users',
    method: 'POST',
    data: { email, password },
    onSuccess: setUser,
    onFailure: setError,
  }
});

export const userLogin = (email, password) => ({
  type: API,
  payload: {
    url: '/users/login',
    method: 'POST',
    data: { email, password },
    onSuccess: setUser,
    onFailure: setError,
  }
});

export const setUser = user => ({
  type: SET_USER,
  payload: { ...user, isLoggedIn: true }
});

export const setError = error => dispatch => {
  setTimeout(() => dispatch({
    type: REMOVE_ERROR
  }), 5000);
  return dispatch({
    type: SET_ERROR,
    payload: error
  });
};
