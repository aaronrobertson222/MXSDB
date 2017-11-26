import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import AuthFormWrapper from 'containers/auth-form-wrapper/auth-form-wrapper';

import styles from './auth-layout.css';

const AuthLayout = props => (
  <div styleName="wrapper">
    <AuthFormWrapper type={props.match.params.auth} />
  </div>
);

AuthLayout.propTypes = {
  match: PropTypes.object.isRequired,
};

export default cssModules(AuthLayout, styles);
