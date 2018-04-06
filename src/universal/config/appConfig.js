import envConfig from './environments/production';
import endpoints from './apiEndpoints';

export default {
  ...envConfig,
  ...endpoints,
};
