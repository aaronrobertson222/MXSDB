import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { fetchCurrentUser } from 'actions/index.actions';

class App extends React.Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    user: PropTypes.object,
    fetchCurrentUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: null,
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  fetchCurrentUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
