import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';

import ItemListProvider from 'containers/item-list-provider/item-list-provider';
import ItemGrid from 'components/item-grid/item-grid';
import ItemPage from 'components/item-page/item-page';
import Navbar from 'components/navbar/navbar';

import styles from './main.layout.scss';

const MainLayout = (props) => {
  const categories = ['bikes', 'gear', 'tracks'];

  const routesMarkup = categories.map(category => (
    <Route
      path={`/browse/${category}`}
      render={() => (
        <div>
          <h3 styleName="header">{category}</h3>
          <ItemListProvider
            categories={[category]}
            render={data => (
              <div styleName="container">
                <ItemGrid itemData={data} />
              </div>
            )}
          />
        </div>
      )}
    />
  ));

  return (
    <div styleName="wrapper">
      <Navbar user={props.user} location={props.location.pathname.substring(8)} />
      <div styleName="content">
        <div>
          <Route
            path="/browse"
            exact
            render={() => (
              <div>
                <ItemListProvider
                  title="Recent"
                  by="recent"
                  limit={8}
                  render={data => (
                    <div styleName="container">
                      <ItemGrid itemData={data} />
                    </div>
                  )}
                />
                <ItemListProvider
                  title="Popular"
                  by="popular"
                  limit={8}
                  render={data => (
                    <div styleName="container">
                      <ItemGrid itemData={data} />
                    </div>
                  )}
                />
              </div>
            )}
          />
          {routesMarkup}
          <Route path="/browse/id/:id" component={ItemPage} />
        </div>
      </div>
    </div>
  );
};

MainLayout.defaultProps = {
  user: null,
};

MainLayout.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(MainLayout, styles));
