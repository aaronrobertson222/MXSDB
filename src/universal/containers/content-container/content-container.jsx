/* Going to convert this to render prop pattern
component will be able to fetch items from backend
and not care about layout */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';
import moment from 'moment';

import appConfig from '../../config/appConfig';

import styles from './content-container.scss';

class ContentContainer extends React.Component {
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
    if (loading) {
      return <p>loading</p>;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <div styleName="wrapper">
        <div styleName="container">
          {itemData.map(item => (
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
        {displayCount < count &&
        <button
          onClick={() => this.fetchItems(categories, by, limit, displayCount, users)}
          styleName="show-more-button"
        >
          Show More
        </button>}
      </div>
    );
  }
}

export default cssModules(ContentContainer, styles);
