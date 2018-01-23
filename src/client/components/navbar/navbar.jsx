import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

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
            <Link href="/browse/bikes" to="/browse/bikes">
                Bikes
            </Link>
          </li>
          <li>
            <Link href="/browse/gear" to="/browse/gear">
                Gear
            </Link>
          </li>
          <li>
            <Link href="/browse/tracks" to="/browse/tracks">
                Tracks
            </Link>
          </li>
        </ul>
      </div>
      <div styleName="user">
        <FontAwesome name="chevron-down" styleName="down" />
        <img styleName="userimg" align="right" src="http://via.placeholder.com/45x45" alt="user" />
      </div>
    </div>
  </div>
);

export default cssModules(Navbar, styles, { allowMultiple: true });
