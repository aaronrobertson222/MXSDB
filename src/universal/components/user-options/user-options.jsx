import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import cssModules from 'react-css-modules';

import styles from './user-options.scss';

const UserOptions = (props) => {
  if (props.user === null) {
    return (
      <div styleName="wrapper">
        <span>
          <Link to="/auth/login" href="/auth/login" styleName="login-option">
            Login
          </Link>
        </span>
        <span>
          <Link to="/auth/signup" href="/auth/signup" styleName="signup-option">
            Sign up
          </Link>
        </span>
      </div>
    );
  }

  const trigger = (
    <div>
      <span>
        <Image avatar src="http://via.placeholder.com/45x45" />  {props.user.username}
      </span>
    </div>
  );

  const options = [
    {
      key: 'dashboard',
      text: 'My Dashboard',
      icon: 'dashboard',
      content: <Link to="/dashboard" href="/dashboard" style={{ color: 'black' }}>My Dashboard</Link>,
    },
    {
      key: 'settings',
      text: 'Settings',
      icon: 'settings',
      content: <Link to="/dashboard" href="/dashboard" style={{ color: 'black' }}>Settings</Link>,
    },
    {
      key: 'signout',
      text: 'Sign Out',
      icon: 'sign out',
      content: <Link to="/dashboard" href="/dashboard" style={{ color: 'black' }}>Sign Out</Link>,
    },
  ];

  return (
    <Dropdown className="top right" trigger={trigger} options={options} pointing icon={null} inline />
  );
};

UserOptions.defaultProps = {
  user: null,
};

UserOptions.propTypes = {
  user: PropTypes.object,
};
export default cssModules(UserOptions, styles);
