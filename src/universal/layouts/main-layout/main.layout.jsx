// Defines layout for apps main pages provides header nav and footer
// along with provided page contents as children.

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import Navbar from 'components/navbar/navbar';
import Footer from 'components/footer/footer';

import styles from './main.layout.scss';

const MainLayout = props => (
  <React.Fragment>
    <Navbar user={props.user} />
    { props.children }
    <Footer />
  </React.Fragment>
);

MainLayout.defaultProps = {
  user: null,
};

MainLayout.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(MainLayout, styles));
