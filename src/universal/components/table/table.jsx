import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './table.scss';

const Table = props => (
  <table styleName="table" cellSpacing="0">
    <tr>
      <th>Upload Name</th>
      <th>Private</th>
      <th>File Size</th>
      <th>Downloads</th>
      <th>Date</th>
    </tr>
    {props.items.map(item => (
      <tr>
        <td>{item.title}</td>
        <td>{item.private ? 'yes' : ''}</td>
        <td>0 MB</td>
        <td>{item.downloadCount}</td>
        <td>{item.createdAt}</td>
      </tr>
    ))}
  </table>
);

Table.propTypes = {
  items: PropTypes.array.isRequired,
};

export default cssModules(Table, styles);
