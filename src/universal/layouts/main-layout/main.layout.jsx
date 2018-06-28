// Defines layout for apps main pages provides header nav and footer
// along with provided page contents as children.

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Navbar from 'components/navbar/navbar';
import Footer from 'components/footer/footer';

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

// Exported wrapped by withRouter so connect does not block upadates from children.
export default withRouter(connect(mapStateToProps, null)(MainLayout));
