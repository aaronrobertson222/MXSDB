import React from 'react';
import PropTypes from 'prop-types';

import AuthFormWrapper from 'containers/auth-form-wrapper';

const AuthLayout = props => (
  <AuthFormWrapper type={props.location.pathname} />
);

AuthLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default AuthLayout;
