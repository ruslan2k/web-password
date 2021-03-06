import { API } from '../middleware/api';
import { publicKey } from '../publicKey.pem.js';
import * as crypto from 'crypto-browserify';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
export const GROUPS_FAILURE = 'GROUPS_FAILURE';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const CONFIRM_LOGIN = 'REMOVE_ERROR';

const encryptPassword = password => {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer(password));
  return encrypted.toString('base64');
}

export const fetchGroups = () => ({
  type: API,
  payload: {
    url: '/groups',
    method: 'GET',
    onSuccess: groupsSuccess,
    onFailure: userFailure,
  },
});
export const groupsSuccess = groups => ({
  type: GROUPS_SUCCESS,
  payload: groups
});

export const userRegister = (email, password) => dispatch => {
  const encPassword = encryptPassword(password);
  dispatch(userRequest(email, encPassword));
  dispatch({
    type: API,
    payload: {
      url: '/users',
      method: 'POST',
      data: { email, encPassword },
      onSuccess: userSuccess,
      onFailure: userFailure,
    }
  });
};

export const userLogin = (email, password) => dispatch => {
  const encPassword = encryptPassword(password);
  dispatch(userRequest(email, encPassword));
  dispatch({
    type: API,
    payload: {
      url: '/users/login',
      method: 'POST',
      data: { email, encPassword },
      onSuccess: userSuccess,
      onFailure: userFailure,
    }
  });
};

export const userFetch = () => dispatch => ({
  type: USER_REQUEST,
  payload: {
    url: '/users/me',
    method: 'GET',
    onSuccess: userSuccess,
    onFailure: userFailure,
  }
})

export const userRequest = (email, encPassword) => {
  return {
    type: USER_REQUEST,
    payload: {
      email,
      encPassword,
      isLoggedIn: false,
      isFetching: true
    }
  }
};

export const userSuccess = user => ({
  type: USER_SUCCESS,
  payload: { ...user, isLoggedIn: true }
});

export const userFailure = error => dispatch => {
  dispatch(setError(error))
  return {
    type: USER_FAILURE,
  };
}

export const setError = error => dispatch => {
  setTimeout(() => dispatch({
    type: REMOVE_ERROR
  }), 5000);
  return dispatch({
    type: SET_ERROR,
    payload: error
  });
};
