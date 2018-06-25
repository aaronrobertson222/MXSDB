import appConfig from '../config/appConfig';

export default {
  // Create cookie for auth token
  createTokenCookie(response) {
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
  },
  // Remove auth token cookie
  deleteTokenCookie() {
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  hasAuthCookie() {
    if (document.cookie.split(';').filter(item => item.includes('auth_token=')).length) {
      return true;
    }
    return false;
  },

};
