import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import MenuItem from './menu-item.jsx';

import styles from './toggle-menu.scss';

class ToggleMenu extends Component {
  static propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  }
  static Item = MenuItem;

  constructor(props) {
    super(props);

    this.state = {
      menuToggled: false,
    };
  }


  toggleMenu = () => {
    this.setState(prevState => ({
      menuToggled: !prevState.menuToggled,
    }));
  }

  render() {
    return (
      <Fragment>
        <div role="button" tabIndex="-1" onClick={this.toggleMenu} onKeyDown={() => this.toggleMenu()}>
          { this.props.trigger }
        </div>

        {this.state.menuToggled && <ul styleName="menu">{this.props.children}</ul>}
      </Fragment>
    );
  }
}


export default cssModules(ToggleMenu, styles);
