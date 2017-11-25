import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import App from 'components/app';

import * as routerMap from './static-routes';

class Routes extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  render() {
    const { location } = this.props.location;
    return (
      <App>
        <div>
          <Route exact path="/" location={location} component={routerMap.LandingLayout} />
          <Route path="/app" location={location} component={routerMap.MainLayout} />
          <Route path="/login" location={location} component={routerMap.AuthLayout} />
          <Route path="/signup" location={location} component={routerMap.AuthLayout} />
        </div>
      </App>
    );
  }
}

export default Routes;
