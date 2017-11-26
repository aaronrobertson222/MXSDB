import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthForm from 'containers/auth-form/auth-form';

import styles from './auth-form-wrapper.css';

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
    const { type } = this.props;
    const tab = type === '/login' ? 'login' : 'signup';
    this.setState({ selectedTab: tab });
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName={`form-toggle-container ${this.state.selectedTab}`}>
          <div
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            onFocus={() => {}}
            styleName="login-toggle toggle-tab"
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
            styleName="signup-toggle toggle-tab"
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
