import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import MainLayout from 'layouts/main-layout/main.layout';
import UploadForm from 'containers/upload-form/upload-form';
import Dashboard from 'components/dashboard/dashboard';


import styles from './dashboard.scss';


class DashboardPage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <MainLayout>
        <div styleName="content">
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard user={user} />
            )}
          />
          <Route
            path="/dashboard/upload"
            component={UploadForm}
          />
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(DashboardPage, styles));
