import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

const UserOptions = () => {
  const trigger = (
    <div>
      <span>
        <Image avatar src="http://via.placeholder.com/45x45" /> Jimmy
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
    <Dropdown className="top right" inverted trigger={trigger} options={options} pointing icon={null} inline />
  );
};
export default UserOptions;
