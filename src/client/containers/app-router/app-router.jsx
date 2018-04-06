import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

import routes from '../../../universal/routes/routes';

const AppRouter = (props) => {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  );
};

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;
