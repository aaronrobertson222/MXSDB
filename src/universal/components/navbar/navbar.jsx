import React from 'react';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import UserOptions from 'components/user-options/user-options';

import styles from './navbar.scss';

import LogoSvg from '../../assets/images/MXSDB.svg';

const Navbar = () => {
  const menuOptions = ['bikes', 'gear', 'tracks']; //eslint-disable-line
  return (
    <div styleName="wrapper">
      <div styleName="container">
        <div styleName="header">
          <LogoSvg styleName="logo" />
        </div>
        <div styleName="nav-menu">
          <ul styleName="nav-items">
            {menuOptions.map(item => (
              <Link href={`/browse/${item}`} to={`/browse/${item}`}>
                <li styleName="active">
                  {item}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <UserOptions />
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  user: null,
};
export default cssModules(Navbar, styles, { allowMultiple: true });
