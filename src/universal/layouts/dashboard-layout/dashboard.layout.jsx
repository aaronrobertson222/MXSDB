import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'components/navbar/navbar';
import UploadForm from 'containers/upload-form/upload-form';
import Dashboard from 'components/dashboard/dashboard';
import Footer from 'components/footer/footer';

import styles from './dashboard.layout.scss';


class DashboardLayout extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <div styleName="wrapper">
        <Navbar user={this.props.user} />
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(DashboardLayout, styles));
