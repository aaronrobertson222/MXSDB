import request from 'isomorphic-fetch';
import appConfig from '../../config/appConfig';

const fetch = (url, opts, anonymous = false) => {
  const newOpts = {
    ...opts,
  };

  if (anonymous) {
    newOpts.headers = {
      ...newOpts.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  } else {
    const tokenContent = sessionStorage.getItem(appConfig.TOKEN_CONTENT_KEY);
    newOpts.headers = {
      ...newOpts.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: tokenContent,
    };
  }
  return request(url, newOpts);
};

export default fetch;
