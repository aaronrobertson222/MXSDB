import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Routes from '../../../universal/routes/routes';

const AppRouter = (props) => {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <Route render={({ location }) => (
        <Routes location={location} />
        )}
      />
    </ConnectedRouter>
  );
};

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;
