import axios from 'axios';

export const API = 'API';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || '/api'

export default ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type !== API) { return; }

  const headers = {};
  const user = getState().user;
  const { method, url, data, onSuccess, onFailure } = action.payload;
  if (user && user.token) {
    headers['Authorization'] = 'Bearer ' + user.token;
  }
  if (user && user.encPassword) {
    headers['X-Enc-Password'] = user.encPassword;
  }
  axios({ method, url, data, headers })
    .then(({ data }) => dispatch(onSuccess(data)))
    .catch(err => {
      if (onFailure) {
        dispatch(onFailure(err));
      }
    });
}
