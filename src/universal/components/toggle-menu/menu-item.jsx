import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './toggle-menu.scss';

class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    return (
      <li className={styles['menu-item']}>
        {this.props.children}
      </li>
    );
  }
}

export default MenuItem;
