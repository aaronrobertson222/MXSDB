import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

const App = props => (
  <div>
    {renderRoutes(props.route.routes)}
  </div>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default App;
