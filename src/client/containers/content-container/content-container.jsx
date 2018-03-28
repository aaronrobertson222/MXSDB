import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cssModules from 'react-css-modules';

import { Card, Image } from 'semantic-ui-react';

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
      limit,
      offset,
      users,
    } = this.props;

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
        this.setState({ items: data.results, loading: false }); //eslint-disable-line
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const cardStyle = {
      background: '#1b1c1d',
      boxShadow: 'none',
      color: 'white',
    };
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
          <Link style={{ width: '25%', padding: '0 5px 10px 5px' }} to={`/browse/id/${item.uuid}`} href={`/browse/id/${item.uuid}`}>
            <Card style={cardStyle} inverted styleName="item-card">
              <Image src={item.imageLocation} />
              <Card.Content>
                <Card.Header style={{ color: 'white' }}>
                  {item.title}
                </Card.Header>
                <Card.Meta style={{ color: '#b5b1b6' }}>
                  <span>
                      By {item.creator}
                  </span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra style={{ color: 'white', background: '#212225' }}>
                <i className="material-icons">file_download</i> {item.downloadCount}
              </Card.Content>
            </Card>
          </Link>
          ))}
      </div>
    );
  }
}

export default cssModules(ContentContainer, styles);
