import fetch from '../redux/services/http.js';
import * as actionTypes from './actionTypes';
import appConfig from '../config/appConfig';


const loginSuccessHandler = (response, dispatch) => {
  if (appConfig.ENV !== 'testing') {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 86400000;
    now.setTime(expireTime);

    document.cookie = `auth_token=${response.token};expires=${now};`;
    sessionStorage.removeItem(appConfig.TOKEN_CONTENT_KEY);
    sessionStorage.setItem(appConfig.TOKEN_CONTENT_KEY, response.token);

    sessionStorage.removeItem(appConfig.TOKEN_EXP);
    sessionStorage.setItem(appConfig.TOKEN_EXP, response.tokenExpiration);
  }

  dispatch({
    type: actionTypes.FETCH_LOGIN_REQUEST_SUCCESS,
    response,
  });
};

export const fetchLogin = (username, password) => {
  const promise = fetch(appConfig.USER_LOGIN_PATH, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  }, true);
  return {
    onRequest: actionTypes.FETCH_LOGIN_REQUEST_TRIGGERED,
    onSuccess: loginSuccessHandler,
    onFailure: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
    promise,
  };
};

export const createUser = (username, email, password) => {
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
};

export const fetchCurrentUser = () => {
  const promise = fetch(appConfig.CURRENT_USER_PATH);

  return {
    onRequest: actionTypes.FETCH_USER_TRIGGERED,
    onSuccess: actionTypes.FETCH_USER_SUCCESS,
    onFailure: actionTypes.FETCH_USER_FAILED,
    promise,
  };
};
