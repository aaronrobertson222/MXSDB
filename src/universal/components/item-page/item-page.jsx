import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './item-page.scss';

import appConfig from '../../config/appConfig';


class ItemPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    itemData: null,
    error: null,
    loading: null,
  }

  componentDidMount() {
    this.setState({ loading: true });

    const itemId = this.props.match.params.id;
    fetch(`${appConfig.ITEM_ID_PATH}/${itemId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong while loading');
      })
      .then((data) => {
        this.setState({ itemData: data.item, loading: false }); //eslint-disable-line
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const { itemData, error, loading } = this.state;
    const itemInfo = itemData || {};
    if (loading) {
      return <p>loading</p>;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <div styleName="wrapper">
        <div styleName="image-wrapper">
          <img src={itemInfo.imageLocation} alt={itemInfo.title} />
        </div>
        <div styleName="row">
          <div>
            <h1 styleName="title">2018 Relax Attire Outdoor Team Pack</h1>
            <p styleName="author">Published by <span>{itemInfo.creator}</span></p>
          </div>
          <a href={itemInfo.fileLocation}>
            <button styleName="dl-button">Download</button>
          </a>
        </div>
        <div styleName="info">
          <h3 styleName="description-header">About</h3>
          <span>{itemInfo.description}</span>
        </div>
      </div>
    );
  }
}

export default cssModules(ItemPage, styles);
