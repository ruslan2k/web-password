import axios from 'axios';

export const API = 'API'

axios.defaults.baseURL = '/api'

export default store => next => action => {
  next(action)
  if (action.type !== API) {
    return
  }

  const { method, url, data, onSuccess, } = action.payload;

  axios({ method, url, data })
    .then(({ data }) => onSuccess(data))
    .catch(err => console.error('err', err));
}
