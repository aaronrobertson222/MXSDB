import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { renderRoutes } from 'react-router-config';

import LogoSvg from '../../assets/images/MXSDB.svg';

import styles from './auth-layout.scss';

const AuthLayout = props => (
  <div styleName="wrapper">
    <Link to="/" href="/">
      <LogoSvg styleName="logo" />
    </Link>
    {renderRoutes(props.route.routes)}
  </div>
);

AuthLayout.propTypes = {
  route: PropTypes.object.isRequired,
};

export default cssModules(AuthLayout, styles);
