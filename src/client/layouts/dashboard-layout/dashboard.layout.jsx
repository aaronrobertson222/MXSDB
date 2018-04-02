import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'components/navbar/navbar';
import UploadForm from 'containers/upload-form/upload-form';
import ContentContainer from 'containers/content-container/content-container';

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
          <Switch>
            <Route exact path="/dashboard">
              <div>
                <h1 styleName="header">
                  Dashboard
                </h1>
                <div>
                  <Link to="/dashboard/upload" href="/dashboard/upload">
                    <button>
                      <span>New Upload</span>
                    </button>
                  </Link>
                </div>
                <h2 styleName="header">My Uploads</h2>
                <ContentContainer users={[user.username]} />
              </div>
            </Route>
            <Route path="/dashboard/upload" component={UploadForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(DashboardLayout, styles));
