import React from 'react';
import PropTypes from 'prop-types';

import App from 'components/app';

const AppContainer = props => (
  <App {...props} />
);

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContainer;
