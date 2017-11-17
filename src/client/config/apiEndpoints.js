import envConfig from './environments/development';

export const { MAIN_APP_AUTHORITY } = envConfig;

export default {
  USER_LOGIN_PATH: `${MAIN_APP_AUTHORITY}/login`,
};
