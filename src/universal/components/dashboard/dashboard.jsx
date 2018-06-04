import React from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router-dom';

import ItemListProvider from 'containers/item-list-provider/item-list-provider';
import UserStats from 'components/user-stats/user-stats';
import Table from 'components/table/table';

import styles from './dashboard.scss';

const Dashboard = user => (
  <div styleName="container">
    <h1>Dashboard</h1>
    <UserStats />
    <div>
      <Link to="/dashboard/upload" href="/dashboard/upload">
        <button>
          <span>New Upload</span>
        </button>
      </Link>
    </div>
    <div styleName="section">
      <h2 styleName="header">My Uploads</h2>
      <ItemListProvider
        users={[user.username]}
        limit={8}
        render={data => (
          <div>
            <Table items={data} />
          </div>
          )}
      />
    </div>
  </div>
);

export default cssModules(Dashboard, styles);
