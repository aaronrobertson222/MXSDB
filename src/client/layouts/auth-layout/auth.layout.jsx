import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import AuthFormWrapper from 'containers/auth-form-wrapper';

import styles from './auth-layout.css';

const AuthLayout = props => (
  <div styleName="wrapper">
    <AuthFormWrapper type={props.location.pathname} />
  </div>
);

AuthLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default cssModules(AuthLayout, styles);
