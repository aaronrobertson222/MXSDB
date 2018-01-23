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
    recentItems: PropTypes.array, // eslint-disable-line
  }

  componentWillMount() {
    this.props.fetchRecentItems();
  }

  render() {
    let defaultLayout;
    if (this.props.recentItems !== null) {
      defaultLayout = this.props.recentItems.map(item => (
        <ItemCard item={item} key={item.id} />
      ));
    }
    return (
      <div styleName="wrapper">
        {defaultLayout}
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRecentItems,
};

const mapStateToProps = state => ({
  recentItems: state.item.recentItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(ContentContainer, styles));
