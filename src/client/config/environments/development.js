import defaultConfig from 'config/environments/default';

const configuration = {
  ...defaultConfig,
  CONFIG_NAME: 'Development Config',
  SHOW_REDUX_DEV_TOOLS: true,
};

export default configuration;
