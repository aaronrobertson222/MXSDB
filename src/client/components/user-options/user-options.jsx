import React from 'react';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import styles from './user-options.scss';

const UserOptions = () => (
  <div styleName="useroptions">
    <div styleName="icon">
      <FontAwesome name="chevron-down" styleName="down" />
      <img src="http://via.placeholder.com/45x45" alt="user" styleName="userimg" />
    </div>
    <div styleName="menu">
      <p styleName="username">aaronr5</p>
      <ul styleName="menu-options">
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Signout</li>
      </ul>
    </div>
  </div>
);

export default cssModules(UserOptions, styles);
