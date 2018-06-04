import React from 'react';
import PropTypes from 'prop-types';

import appConfig from '../../config/appConfig';

class ItemListProvider extends React.Component {
  static defaultProps = {
    categories: ['bike', 'track', 'gear'],
    by: 'recent',
    limit: null,
    offset: null,
    users: null,
  }

  static propTypes = {
    categories: PropTypes.array,
    by: PropTypes.string,
    limit: PropTypes.number,
    offset: PropTypes.number,
    users: PropTypes.array,
    render: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: null,
      loading: null,
      count: null,
      displayCount: 0,
    };
  }


  componentDidMount() {
    this.setState({ loading: true });

    const {
      categories,
      by,
      limit,
      offset,
      users,
    } = this.props;

    this.fetchItems(categories, by, limit, offset, users);
  }

  fetchItems(categories, by, limit, offset, users) {
    let endpoint = `${appConfig.FETCH_ITEMS_PATH}?category=${categories.toString()}&by=${by}&limit=${limit || 12}&offset=${offset || 0}`;

    if (users) {
      endpoint = `${appConfig.FETCH_ITEMS_PATH}?category=${categories.toString()}&by=${by}&limit=${limit || 12}&offset=${offset || 0}&users=${users}`;
    }

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong while loading...');
      })
      .then((data) => {
        const displayedItems = this.state.items.length + data.results.length;
        this.setState(prevState => ({
          items: [...prevState.items, ...data.results],
          displayCount: displayedItems,
          count: data.total,
          loading: false,
        }));
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const {
      items,
      error,
      loading,
      count,
      displayCount,
    } = this.state;

    const {
      categories,
      by,
      limit,
      users,
    } = this.props;

    const itemData = items || [];

    const data = { //eslint-disable-line
      itemData,
      ...this.state,
      ...this.props,
    };

    if (loading) {
      return <p>loading</p>;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <div>
        {this.props.render(itemData)}
        {displayCount < count &&
        <button
          onClick={() => this.fetchItems(categories, by, limit, displayCount, users)}
        >
          Show More
        </button>}
      </div>
    );
  }
}

export default ItemListProvider;
