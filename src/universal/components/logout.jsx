import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userLogout } from 'actions/user.actions';
import auth from '../utils/auth';

class Logout extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userLogout: PropTypes.func.isRequired,
  }

  componentDidMount() {
    auth.deleteTokenCookie();
    this.props.userLogout();
    this.props.history.push('/browse');
  }

  render() {
    return (
      <h1>Logging Out</h1>
    );
  }
}

const mapDispatchToProps = {
  userLogout,
};

export default connect(null, mapDispatchToProps)(withRouter(Logout));
