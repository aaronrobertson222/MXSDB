import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import AuthFormWrapper from 'containers/auth-form-wrapper/auth-form-wrapper';
import LogoSvg from '../../assets/images/MXSDB.svg';

import styles from './auth.scss';

import auth from '../../utils/auth';

const AuthPage = (props) => {
  if (auth.hasAuthCookie()) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <div styleName="wrapper">
      <Link to="/" href="/">
        <LogoSvg styleName="logo" />
      </Link>
      <AuthFormWrapper type={props.match.params.authType} />
    </div>
  );
};

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(AuthPage, styles));
