import { API } from '../middleware/api'

export const SET_USER = 'SET_USER'

export const userRegister = (email, password) => ({
  type: API,
  payload: {
    url: '/users',
    method: 'POST',
    data: { email, password },
    onSuccess: setUser
  }
});

export const setUser = user => ({
  type: SET_USER,
  payload: user
})
