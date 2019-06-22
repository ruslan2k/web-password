import axios from 'axios';

export const API = 'API'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || '/api'

export default ({ dispatch }) => next => action => {
  next(action)
  if (action.type !== API) {
    return
  }

  const { method, url, data, onSuccess, } = action.payload;

  axios({ method, url, data })
    .then(({ data }) => dispatch(onSuccess(data)))
    .catch(err => console.error('err', err));
}
