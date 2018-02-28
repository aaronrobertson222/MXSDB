import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';

import Navbar from 'components/navbar/navbar';
import ContentContainer from 'containers/content-container/content-container';
import styles from './main.layout.scss';

const MainLayout = (props) => {
  let content; //eslint-disable-line
  if (props.match.isExact) {
    content = (
      <div styleName="content">
        <h2 styleName="section-header">Recent Uploads</h2>
        <ContentContainer />
        <hr />
        <h2 styleName="section-header">Popular</h2>
        <ContentContainer />
      </div>
    );
  }

  return (
    <div styleName="wrapper">
      <Navbar />
      <Route path="/">{content}</Route>
    </div>
  );
};

MainLayout.propTypes = {
  match: PropTypes.object.isRequired,
};

export default cssModules(MainLayout, styles);
