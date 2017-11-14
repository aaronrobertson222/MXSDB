import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import styles from './navbar.css';

import LogoSvg from '../../assets/images/MXSDB.svg';

const Navbar = () => (
  <div styleName="wrapper">
    <div styleName="container">
      <div styleName="header">
        <LogoSvg styleName="logo" />
      </div>
      <div styleName="nav-menu">
        <ul styleName="nav-items">
          <li>
            <Link href="/" to="/">
                Bikes
            </Link>
          </li>
          <li>
            <Link href="/" to="/">
                Gear
            </Link>
          </li>
          <li>
            <Link href="/" to="/">
                Tracks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default cssModules(Navbar, styles, { allowMultiple: true });