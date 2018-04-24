import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import LandingNavbar from 'components/landing-navbar/landing-navbar';

import styles from './hero.scss';

const Hero = () => (
  <div styleName="wrapper">
    <LandingNavbar />
    <div styleName="container">
      <div styleName="slogan">
        <h2>Create. Share. <span styleName="red">Shred.</span></h2>
      </div>
      <Link to="/browse" href="/browse">
        <button styleName="browse-button">Browse</button>
      </Link>
    </div>
    <div>
      <FontAwesome name="fa-angle-double-down" />
    </div>
  </div>
);

export default cssModules(Hero, styles, { allowMultiple: true });
