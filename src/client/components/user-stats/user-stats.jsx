import React from 'react';
import { Icon, Statistic } from 'semantic-ui-react';
import cssModules from 'react-css-modules';

import styles from './user-stats.scss';

const UserStats = () => (
  <div styleName="container">
    <div styleName="stats-container">
      <Statistic.Group inverted size="tiny" color="red" widths="2">
        <Statistic>
          <Statistic.Value>Admin</Statistic.Value>
          <Statistic.Label>User Level</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value><Icon name="download" /> 222</Statistic.Value>
          <Statistic.Label>Downloads</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value><Icon name="upload" /> 222</Statistic.Value>
          <Statistic.Label>Uploads</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  </div>
);

export default cssModules(UserStats, styles);
