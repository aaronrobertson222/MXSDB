import React from 'react';
import cssModules from 'react-css-modules';

import UploadIcon from '../../assets/images/icons/upload.svg';
import UserIcon from '../../assets/images/icons/user.svg';
import DownloadIcon from '../../assets/images/icons/download.svg';

import styles from './user-stats.scss';

const UserStats = () => (
  <div styleName="container">
    <div styleName="stat-wrapper">
      <div styleName="icon">
        <UserIcon styleName="icon-img" />
      </div>

      <div styleName="stat">
        <p>Admin</p>
        <h2>User Level</h2>
      </div>
    </div>

    <div styleName="stat-wrapper">
      <div styleName="icon">
        <UploadIcon styleName="icon-img" />
      </div>

      <div styleName="stat">
        <p>10</p>
        <h2>Uploads</h2>
      </div>
    </div>

    <div styleName="stat-wrapper">
      <div styleName="icon">
        <DownloadIcon styleName="icon-img" />
      </div>

      <div styleName="stat">
        <p>500</p>
        <h2>Total Downloads</h2>
      </div>
    </div>
  </div>
);

export default cssModules(UserStats, styles, { allowMultiple: true });
