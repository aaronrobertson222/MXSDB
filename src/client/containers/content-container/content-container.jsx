import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import ItemCard from 'components/item-card/item-card';

import styles from './content-container.scss';

class ContentContainer extends React.Component {
  static defaultProps = {
    categories: ['bike', 'track', 'gear'],
    by: 'recent',
    itemLimit: null,
    itemOffset: null,
  }
  static propTypes = {
    categories: PropTypes.array,
    by: PropTypes.string,
    itemLimit: PropTypes.number,
    itemOffset: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      items: null,
      error: null,
      loading: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const {
      categories,
      by,
      itemLimit,
      itemOffset,
    } = this.props;

    fetch(`http://localhost:8080/api/uploads?category=${categories.toString()}&by=${by}&limit=${itemLimit || 12}&offset=${itemOffset || 0}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong while loading...');
      })
      .then((data) => {
        this.setState({ items: data.results, loading: false }); //eslint-disable-line
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const { items, error, loading } = this.state;
    const itemData = items || [];
    if (loading) {
      return <p>loading</p>;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <div styleName="wrapper">
        {itemData.map(item => (
          <ItemCard item={item} key={item.title}>{item.title}</ItemCard>
        ))}
      </div>
    );
  }
}

export default cssModules(ContentContainer, styles);
