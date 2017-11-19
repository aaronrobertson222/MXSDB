import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import styles from './landing-navbar.css';

import LogoSvg from '../../assets/images/MXSDB.svg';

const LandingNavbar = () => (
  <div styleName="wrapper">
    <div styleName="container">
      <Link to="/" href="/">
        <LogoSvg styleName="logo" />
      </Link>
      <ul styleName="user-options">
        <li>
          <Link to="/login" href="/login" styleName="login-option">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" href="/signup" styleName="signup-option">
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default cssModules(LandingNavbar, styles);
