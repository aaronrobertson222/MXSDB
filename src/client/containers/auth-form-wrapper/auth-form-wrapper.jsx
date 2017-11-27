import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthForm from 'containers/auth-form/auth-form';

import styles from './auth-form-wrapper.scss';

class AuthFormWrapper extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: null,
    };
  }

  componentWillMount() {
    const tab = this.props.type === 'login' ? 'login' : 'signup';
    this.setState({ selectedTab: tab });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedTab: nextProps.type });
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="form-toggle-container">
          <div
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            onFocus={() => {}}
            styleName={this.state.selectedTab === 'login' ? 'toggle-tab active' : 'toggle-tab'}
            role="button"
            tabIndex="0"
          >
            <Link to="/login" href="/login" >
              <span styleName="tab-span">
                Login
              </span>
            </Link>
          </div>
          <div
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            onFocus={() => {}}
            styleName={this.state.selectedTab === 'signup' ? 'toggle-tab active' : 'toggle-tab'}
            role="button"
            tabIndex="0"
          >
            <Link to="/signup" href="/signup" >
              <span styleName="tab-span">
                  Signup
              </span>
            </Link>
          </div>
        </div>
        <AuthForm formType={this.state.selectedTab} />
      </div>
    );
  }
}

export default cssModules(AuthFormWrapper, styles, { allowMultiple: true });
