import request from 'isomorphic-fetch';
import appConfig from '../../config/appConfig';

const fetch = (url, opts, anonymous = false) => {
  const newOpts = {
    ...opts,
  };

  if (anonymous) {
    newOpts.headers = {
      ...newOpts.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json, */*',
    };
  } else {
    const tokenContent = sessionStorage.getItem(appConfig.TOKEN_CONTENT_KEY);
    newOpts.headers = {
      ...newOpts.headers,
      Accept: 'application/json, */*',
      Authorization: tokenContent,
    };
  }
  return request(url, newOpts);
};

export default fetch;
