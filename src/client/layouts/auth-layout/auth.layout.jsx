import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import AuthFormWrapper from 'containers/auth-form-wrapper/auth-form-wrapper';
import LogoSvg from '../../assets/images/MXSDB.svg';

import styles from './auth-layout.scss';

const AuthLayout = props => (
  <div styleName="wrapper">
    <Link to="/" href="/">
      <LogoSvg styleName="logo" />
    </Link>
    <AuthFormWrapper type={props.match.params.auth} />
  </div>
);

AuthLayout.propTypes = {
  match: PropTypes.object.isRequired,
};

export default cssModules(AuthLayout, styles);
