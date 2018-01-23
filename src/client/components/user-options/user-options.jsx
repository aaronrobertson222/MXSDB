import React from 'react';
import cssModules from 'react-css-modules';

import styles from './user-options.scss';

const UserOptions = () => (
  <div styleName="useroptions">
    <img src="http://via.placeholder.com/50x50" alt="user" />
  </div>
);

export default cssModules(UserOptions, styles);
