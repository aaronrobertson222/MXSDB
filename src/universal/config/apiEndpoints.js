import envConfig from './environments/development';

export const { MAIN_APP_AUTHORITY } = envConfig;

export default {
  USER_LOGIN_PATH: `${MAIN_APP_AUTHORITY}/users/login`,
  USER_SIGNUP_PATH: `${MAIN_APP_AUTHORITY}/users`,
  FETCH_ITEMS_PATH: `${MAIN_APP_AUTHORITY}/uploads/`,
  CREATE_ITEM_PATH: `${MAIN_APP_AUTHORITY}/uploads/`,
  CURRENT_USER_PATH: `${MAIN_APP_AUTHORITY}/users/me`,
  ITEM_ID_PATH: `${MAIN_APP_AUTHORITY}/uploads/id`,
};
