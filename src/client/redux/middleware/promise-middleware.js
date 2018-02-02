const parseJSON = response => response.json();

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // When not 2xx, it will end up here...
  return response.json().then((data) => {
    const error = new Error(response.statusText);
    error.response = data;
    throw error;
  });
};

export default function promiseMiddleware({ dispatch, getState }) {
  return next => (action) => {
    const {
      promise, onRequest, onSuccess, onFailure, ...rest
    } = action;
    if (!promise) {
      // if action dispatched is not a promise, just send it to the next processor
      return next(action);
    }

    if (typeof onRequest === 'function') {
      onRequest(dispatch, getState, ...rest);
    } else {
      dispatch({ type: onRequest, ...rest });
    }

    return promise
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        try {
          if (typeof onSuccess === 'function') {
            onSuccess(response, dispatch, getState, ...rest);
          } else {
            dispatch({ type: onSuccess, response, ...rest });
          }
        } catch (e) {
          e.message = `Action success error: ${e.message}`;
          e.type = 'ActionError';
          throw e;
        }
      })
      .catch((error) => {
        if (error.type !== 'ActionError' || error.type === 'Unauthorized') {
          if (typeof onFailure === 'function') {
            onFailure(error.response, dispatch, getState, ...rest);
          } else {
            dispatch({ type: onFailure, error: error.response, ...rest });
          }
        } else {
          throw error;
        }
      });
  };
}
