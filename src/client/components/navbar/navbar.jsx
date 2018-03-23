import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import cssModules from 'react-css-modules';

import UserOptions from 'components/user-options/user-options';

import styles from './navbar.css';

import LogoSvg from '../../assets/images/MXSDB.svg';

const Navbar = (props) => {
  const menuOptions = ['bikes', 'gear', 'tracks'];
  return (
    <Menu inverted>
      <Menu.Item>
        <Link to="/browse" href="/browse">
          <LogoSvg styleName="logo" />
        </Link>
      </Menu.Item>
      {menuOptions.map(option => (
        <Menu.Item key={option}>
          <Link to={`/browse/${option}`} href={`/browse/${option}`}>{option.toUpperCase()}</Link>
        </Menu.Item>
      ))}
      <Menu.Item position="right">
        <UserOptions user={props.user} />
      </Menu.Item>
    </Menu>
  );
  // <div styleName="wrapper">
  //   <div styleName="container">
  //     <div styleName="header">
  //       <LogoSvg styleName="logo" />
  //     </div>
  //     <div styleName="nav-menu">
  //       <ul styleName="nav-items">
  //         <li>
  //           <Link href="/browse/bikes" to="/browse/bikes">
  //               Bikes
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href="/browse/gear" to="/browse/gear">
  //               Gear
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href="/browse/tracks" to="/browse/tracks">
  //               Tracks
  //           </Link>
  //         </li>
  //       </ul>
  //     </div>
  //     <UserOptions />
  //   </div>
  // </div>
};

Navbar.defaultProps = {
  user: null,
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default cssModules(Navbar, styles, { allowMultiple: true });
