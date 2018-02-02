import React from 'react';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import LandingNavbar from 'components/landing-navbar/landing-navbar';

import styles from './hero.scss';

const Hero = () => (
  <div styleName="wrapper">
    <LandingNavbar />
    <div styleName="container">
      <h2 styleName="slogan">Create. Share. <span styleName="red">Shred.</span></h2>
    </div>
    <div>
      <FontAwesome name="fa-angle-double-down" />
    </div>
  </div>
);

export default cssModules(Hero, styles, { allowMultiple: true });
