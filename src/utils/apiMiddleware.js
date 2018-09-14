// thanks to https://github.com/ohansemmanuel/fake-medium

import axios from 'axios';
import { apiError, apiStart, apiEnd, } from './apiActions';

const apiMiddleware = ({ dispatch, }) => next => action => {
  next(action);

  if (!action.isAPI) {return;}

  const {
    url,
    method,
    data,
    // accessToken,
    onSuccess,
    onFailure,
    headers,
  } = action.payload;
  const dataOrParams = ['GET', 'DELETE',].includes(method) ? 'params' : 'data';

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  if (action.type) {
    dispatch(apiStart(action.type));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then((response) => {
      dispatch(onSuccess(response.data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));

      // if (error.response && error.response.status === 403) {
      //   dispatch(accessDenied(window.location.pathname));
      // }
    })
    .finally(() => {
      if (action.type) {
        dispatch(apiEnd(action.type));
      }
    });
};

export default apiMiddleware;
