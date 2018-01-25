import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import styles from './item-card.scss';

const ItemCard = props => (
  <div styleName="container">
    <img src={props.item.imgLocation} alt="blah" styleName="item-img" />
    <div styleName="info">
      <p styleName="title">{props.item.name}</p>
      <p styleName="creator">{props.item.creator}</p>
      <div styleName="stats">
        <section>
          <FontAwesome name="thumbs-o-up" styleName="icon" />
          <p styleName="count">100</p>
        </section>
        <section>
          <FontAwesome name="arrow-circle-down" styleName="icon" />
          <p styleName="count">{props.item.downloadCount}</p>
        </section>
      </div>
    </div>
  </div>
);

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default cssModules(ItemCard, styles, { allowMultiple: true });
