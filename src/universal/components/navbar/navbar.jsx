import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import ToggleMenu from 'components/toggle-menu/toggle-menu';

import styles from './navbar.scss';

import LogoSvg from '../../assets/images/MXSDB.svg';

const Navbar = (props) => {
  const { user } = props;
  // Site Nav menu items
  const menuOptions = ['bikes', 'gear', 'tracks'];
  // Options for user menu
  const userOptions = [
    {
      content: 'dashboard',
      route: '/dashboard',
    },
    {
      content: 'upload',
      route: '/dashboard/upload',
    },
    {
      content: 'settings',
      route: '/dashboard/settings',
    },
    {
      content: 'logout',
      route: '/logout',
    },
  ];

  return (
    <div styleName="wrapper">
      <div styleName="container">
        <div styleName="header">
          <Link to="/browse" href="/browse">
            <LogoSvg styleName="logo" />
          </Link>
        </div>
        <div styleName="nav-menu">
          <ul styleName="nav-items">
            {menuOptions.map(item => (
              <li key={item}>
                <NavLink href={`/browse/${item}`} to={`/browse/${item}`} activeClassName={styles.active}>
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div styleName="user-menu">
          {user ?
            <ToggleMenu trigger={<p>{user.username}</p>}>
              {userOptions.map(item => (
                <ToggleMenu.Item>
                  <Link to={item.route} href={item.route}>
                    {item.content}
                  </Link>
                </ToggleMenu.Item>
              ))}
            </ToggleMenu> :
            <ul styleName="auth-options">
              <li>
                <Link to="/auth/login" href="/auth/login" styleName="login">
                Login
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" href="/auth/login" styleName="signup">
                  signup
                </Link>
              </li>
            </ul>}
        </div>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  user: null,
};

Navbar.propTypes = {
  user: PropTypes.object,
};
export default cssModules(Navbar, styles, { allowMultiple: true });
