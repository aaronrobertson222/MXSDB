import React from 'react';
import cssModules from 'react-css-modules';

import styles from './sidebar.scss';

const Sidebar = () => (
  <div styleName="wrapper">
    <div styleName="container">
      hello sidebar
    </div>
  </div>
);

export default cssModules(Sidebar, styles);
