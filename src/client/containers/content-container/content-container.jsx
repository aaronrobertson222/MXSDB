import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import ItemCard from 'components/item-card/item-card';

import { fetchRecentItems } from 'actions/index.actions';

import styles from './content-container.scss';

class ContentContainer extends React.Component {
  static propTypes = {
    fetchRecentItems: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.fetchRecentItems();
  }
  render() {
    return (
      <div styleName="wrapper">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRecentItems,
};

export default connect(null, mapDispatchToProps)(cssModules(ContentContainer, styles));
