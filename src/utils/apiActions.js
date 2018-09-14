// thanks to https://github.com/ohansemmanuel/fake-medium

export const apiStart = actionName => ({
  type: 'API_START',
  payload: actionName,
});

export const apiEnd = actionName => ({
  type: 'API_END',
  payload: actionName,
});

// export const accessDenied = url => ({
//   type: 'ACCESS_DENIED',
//   payload: {
//     url,
//   },
// });

export const apiError = error => ({
  type: 'API_ERROR',
  error,
});

export const apiRequest = ({
  url = '',
  method = 'GET',
  data = null,
  // accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  actionName = '',
  headersOverride = null,
}) => {
  return {
    type: actionName,
    isAPI: true,
    payload: {
      url,
      method,
      data: data,
      // accessToken,
      onSuccess,
      onFailure,
      headersOverride,
    },
  };
};
