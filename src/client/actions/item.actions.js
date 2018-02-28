import fetch from '../redux/services/http.js';
import * as actionTypes from './actionTypes';
import appConfig from '../config/appConfig';

export const fetchItems = (filter) => {
  const promise = fetch(`${appConfig.FETCH_ITEMS_PATH}${filter}`);

  return {
    onRequest: actionTypes.FETCH_ITEMS_REQUEST_TRIGGER,
    onSuccess: actionTypes.FETCH_ITEMS_REQUEST_SUCCESS,
    onFailure: actionTypes.FETCH_ITEMS_REQUEST_FAILURE,
    promise,
  };
};

export const fetchRecentItems = () => {
  const promise = fetch(`${appConfig.FETCH_ITEMS_PATH}recent`, {
    method: 'POST',
    data: { currentPage: 1 },
  }, true);

  return {
    onRequest: actionTypes.FETCH_RECENT_ITEMS_REQUEST_TRIGGER,
    onSuccess: actionTypes.FETCH_RECENT_ITEMS_REQUEST_SUCCESS,
    onFailure: actionTypes.FETCH_RECENT_ITEMS_REQUEST_FAILURE,
    promise,
  };
};

export const createItem = (formData) => {
  console.log(formData); //eslint-disable-line
  const promise = fetch(appConfig.CREATE_ITEM_PATH, {
    method: 'POST',
    body: formData,
  });

  return {
    onRequest: actionTypes.CREATE_ITEM_REQUEST_TRIGGER,
    onSuccess: actionTypes.CREATE_ITEM_REQUEST_SUCCESS,
    onFailure: actionTypes.CREATE_ITEM_REQUEST_FAILURE,
    promise,
  };
};
