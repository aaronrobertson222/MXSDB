import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import moment from 'moment';

import styles from './item-grid.scss';

const ItemGrid = props => (
  <div styleName="container">
    {props.itemData.map(item => (
      <Link style={{ width: '25%', padding: '0 10px 20px 0' }} to={`/browse/id/${item.uuid}`} key={item.createdAt} href={`/browse/id/${item.uuid}`}>
        <div styleName="content-container">
          <div styleName="thumbnail">
            <div styleName="category">{item.category}</div>
            <img src={item.imageLocation} alt={item.title} />
          </div>
          <div styleName="item-info">
            <h2 styleName="title">{item.title}</h2>
            <p>by <span styleName="creator">{item.creator}</span></p>
            <p>Uploaded {moment(item.createdAt).fromNow()}</p>
            <div styleName="meta-info">
              <span>{item.downloadCount} Downloads</span>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

ItemGrid.propTypes = {
  itemData: PropTypes.array.isRequired,
};

export default cssModules(ItemGrid, styles);
