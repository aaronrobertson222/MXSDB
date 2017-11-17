import React from 'react';
import cssModules from 'react-css-modules';

import styles from './landing-navbar.css';

import LogoSvg from '../../assets/images/MXSDB.svg';


const LandingNavbar = () => (
  <div styleName="wrapper">
    <div styleName="container">
      <LogoSvg styleName="logo" />
      <div styleName="user-options">
        <button>
        Login
        </button>
        <button>
        Signup
        </button>
      </div>
    </div>
  </div>
);

export default cssModules(LandingNavbar, styles);
