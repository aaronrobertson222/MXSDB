import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';
import styles from './navbar.css';

const Navbar = () => (
  <header styleName="container">
    <nav styleName="navigation">
      <div styleName="navigation-section">
        <Link to="/" href="/" styleName="logo-link">
          <img alt="MXSDB" src="../../assets/images/MXSDB.svg" styleName="logo" />
        </Link>
      </div>
      <div styleName="navigation-section">
        <ul styleName="nav-link-list">
          <li styleName="nav-link-item">
            <Link to="/bikes" href="/bikes">
              Bikes
            </Link>
          </li>
          <li styleName="nav-link-item">
            <Link to="/gear" href="/gear">
              Gear
            </Link>
          </li>
          <li styleName="nav-link-item">
            <Link to="/tracks" href="/tracks">
              Tracks
            </Link>
          </li>
        </ul>
      </div>
      <div styleName="navigation-section">
        <ul styleName="nav-link-list">
          <li styleName="nav-link-item">Sign-Up</li>
          <li styleName="nav-link-item">Login</li>
        </ul>
      </div>
    </nav>
  </header>
);

export default cssModules(Navbar, styles);
