import React from 'react';
import cssModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import styles from './item-card.scss';

const ItemCard = () => (
  <div styleName="container">
    <div styleName="image-container">
      <img src={require('assets/images/placehold.png')} alt="blah" styleName="item-img" />
    </div>
    <div styleName="info">
      <p styleName="title">2018 Relax Attire Supercross</p>
      <p styleName="creator">Dryan345</p>
      <p styleName="type">Team Pack</p>
      <div styleName="stats">
        <section>
          <FontAwesome name="thumbs-o-up" styleName="icon" />
          <p styleName="count">100</p>
        </section>
        <section>
          <FontAwesome name="arrow-circle-down" styleName="icon" />
          <p styleName="count">125</p>
        </section>
      </div>
    </div>
  </div>
);

export default cssModules(ItemCard, styles, { allowMultiple: true });
