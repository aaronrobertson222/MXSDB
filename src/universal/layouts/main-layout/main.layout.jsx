import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';

import ContentContainer from 'containers/content-container/content-container';
import ItemPage from 'components/item-page/item-page';
import Navbar from 'components/navbar/navbar';

import styles from './main.layout.scss';

const MainLayout = props => (
  <div styleName="wrapper">
    <Navbar user={props.currentUser} location={props.location.pathname.substring(8)} />
    <div styleName="content">
      <div>
        <Route
          path="/browse"
          exact
          render={() => (
            <div>
              <ContentContainer title="Recent" by="recent" limit={8} />
              <ContentContainer title="Popular" by="popular" limit={8} />
            </div>
            )}
        />
        <Route
          path="/browse/bikes"
          render={() => (
            <div>
              <h3 styleName="header">Bikes</h3>
              <ContentContainer categories={['bike']} />
            </div>
            )}
        />
        <Route
          path="/browse/gear"
          render={() => (
            <div>
              <h3 styleName="header">Gear</h3>
              <ContentContainer categories={['gear']} />
            </div>
            )}
        />
        <Route
          path="/browse/tracks"
          render={() => (
            <div>
              <h3 styleName="header">Tracks</h3>
              <ContentContainer categories={['track']} />
            </div>
            )}
        />
        <Route path="/browse/id/:id" component={ItemPage} />
      </div>
    </div>
  </div>
);

MainLayout.defaultProps = {
  currentUser: null,
};

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default cssModules(MainLayout, styles);
