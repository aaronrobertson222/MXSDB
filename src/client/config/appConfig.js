// TODO: figure out why envConfig import does not work with just 'envConfig'
import envConfig from './environments/development';
import endpoints from './apiEndpoints';

export default {
  ...envConfig,
  ...endpoints,
};
