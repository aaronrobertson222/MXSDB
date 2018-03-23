import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCurrentUser } from 'actions/index.actions';

import App from 'components/app/app';

import * as routerMap from './static-routes';

class Routes extends React.Component {
  static defaultProps = {
    user: null,
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object,
    fetchCurrentUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (sessionStorage.getItem('authToken')) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    const { location, user } = this.props;
    return (
      <App>
        <div>
          <Switch>
            <Route exact path="/" location={location} component={routerMap.LandingLayout} />
            <Route path="/browse" location={location} render={props => <routerMap.MainLayout currentUser={user} {...props} />} />
            <Route
              path="/dashboard"
              location={location}
              render={props => (
                user ? (<routerMap.DashboardLayout currentUser={user} {...props} />) : (<Redirect to="/login" />)
            )}
            />
            <Route
              path="/:auth"
              location={location}
              render={props => (
                user ? (<Redirect to="/dashboard" />) : (<routerMap.AuthLayout {...props} />)
              )}
            />
          </Switch>
        </div>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  fetchCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
