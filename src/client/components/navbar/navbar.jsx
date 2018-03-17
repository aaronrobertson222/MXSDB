import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import cssModules from 'react-css-modules';

import UserOptions from 'components/user-options/user-options';

import styles from './navbar.css';

import LogoSvg from '../../assets/images/MXSDB.svg';

const Navbar = () => {
  const menuOptions = ['bikes', 'gear', 'tracks'];
  return (
    <Menu inverted>
      <Menu.Item>
        <LogoSvg styleName="logo" />
      </Menu.Item>
      {menuOptions.map(option => (
        <Menu.Item>
          <Link to={`/${option}`} href={`/${option}`}>{option}</Link>
        </Menu.Item>
      ))}
      <Menu.Item position="right">
        <UserOptions />
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

export default cssModules(Navbar, styles, { allowMultiple: true });
