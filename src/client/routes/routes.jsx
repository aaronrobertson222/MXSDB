import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import App from 'components/app/app';

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
          <Switch>
            <Route exact path="/" location={location} component={routerMap.LandingLayout} />
            <Route path="/browse" location={location} component={routerMap.MainLayout} />
            <Route path="/dashboard" location={location} component={routerMap.DashboardLayout} />
            <Route path="/:auth" location={location} component={routerMap.AuthLayout} />
          </Switch>
        </div>
      </App>
    );
  }
}

export default Routes;
