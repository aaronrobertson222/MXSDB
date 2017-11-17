import React from 'react';
import cssModules from 'react-css-modules';

import LandingNavbar from 'components/landing-navbar';

import styles from './hero.css';

const Hero = () => (
  <div styleName="wrapper">
    <LandingNavbar />
  </div>
);

export default cssModules(Hero, styles);
