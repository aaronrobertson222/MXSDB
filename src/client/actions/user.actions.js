import fetch from '../redux/services/http.js';
import * as actionTypes from './actionTypes';
import appConfig from '../config/appConfig';

import history from '../history';

const successRedirect = (response, dispatch) => {
  history.push('/app');
  dispatch({
    type: actionTypes.FETCH_LOGIN_REQUEST_SUCCESS,
    response,
  });
};

export function fetchLogin(username, password) {
  const promise = fetch(appConfig.USER_LOGIN_PATH, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  }, true);
  return {
    onRequest: actionTypes.FETCH_LOGIN_REQUEST_TRIGGERED,
    onSuccess: successRedirect,
    onFailure: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
    promise,
  };
}

export function createUser(username, email, password) {
  const promise = fetch(appConfig.USER_SIGNUP_PATH, {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }, true);

  return {
    onRequest: actionTypes.CREATE_USER_REQUEST_TRIGGERED,
    onSuccess: actionTypes.CREATE_USER_REQUEST_SUCCESS,
    onFailure: actionTypes.CREATE_USER_REQUEST_FAILURE,
    promise,
  };
}
