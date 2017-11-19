import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthForm from 'containers/auth-form';

import styles from './auth-form-wrapper.css';

class AuthFormWrapper extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired, //eslint-disable-line
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: null,
    };

    this.toggleFormType = this.toggleFormType.bind(this);
  }

  componentWillMount() {
    const { type } = this.props;
    let tab;
    if (type === '/login') {
      tab = 'login';
    }
    if (type === '/signup') {
      tab = 'signup';
    }
    this.setState({ selectedTab: tab });
  }

  toggleFormType() {
    if (this.state.selectedTab === 'login') {
      this.setState({ selectedTab: 'signup' });
    } else {
      this.setState({ selectedTab: 'login' });
    }
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName={`form-toggle-container ${this.state.selectedTab}`}>
          <div
            onClick={this.toggleFormType}
            onKeyPress={this.toggleFormType}
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
            onClick={this.toggleFormType}
            onKeyPress={this.toggleFormType}
            onFocus={() => {}}
            styleName="signup-toggle toggle-tab"
            role="button"
            tabIndex="0"
          >
            <span>
              <Link to="/signup" href="/signup" >
                <span styleName="tab-span">
                  Signup
                </span>
              </Link>
            </span>
          </div>
        </div>
        <AuthForm formType={this.state.selectedTab} />
      </div>
    );
  }
}

export default cssModules(AuthFormWrapper, styles, { allowMultiple: true });
