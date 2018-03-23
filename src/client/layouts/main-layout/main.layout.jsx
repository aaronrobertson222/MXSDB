import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route, Switch } from 'react-router-dom';

import { Divider, Header } from 'semantic-ui-react';

import Navbar from 'components/navbar/navbar';
import ContentContainer from 'containers/content-container/content-container';
import styles from './main.layout.scss';

const MainLayout = props => (
  <div styleName="wrapper">
    <Navbar user={props.currentUser} />
    <Switch>
      <Route exact path="/browse">
        <div styleName="content">
          <Header inverted>Recent Uploads</Header>
          <Divider inverted />
          <ContentContainer by="recent" />
          <Header inverted>Popular</Header>
          <Divider inverted />
          <ContentContainer by="popular" />
        </div>
      </Route>
      <Route path="/browse/bikes">
        <div styleName="content">
          <Header inverted>Bikes</Header>
          <ContentContainer categories={['bike']} />
        </div>
      </Route>
      <Route path="/browse/gear">
        <div styleName="content">
          <Header inverted>Gear</Header>
          <ContentContainer categories={['gear']} />
        </div>
      </Route>
      <Route path="/browse/tracks">
        <div styleName="content">
          <Header inverted>Tracks</Header>
          <ContentContainer categories={['track']} />
        </div>
      </Route>
    </Switch>
  </div>
);

MainLayout.defaultProps = {
  currentUser: null,
};

MainLayout.propTypes = {
  currentUser: PropTypes.object,
};

export default cssModules(MainLayout, styles);
