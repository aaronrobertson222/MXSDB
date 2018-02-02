import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthForm from 'containers/auth-form/auth-form';
import { fetchLogin, createUser } from 'actions/index.actions';

import styles from './auth-form-wrapper.scss';

class AuthFormWrapper extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    fetchLogin: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: null,
    };
    this.dispatchAction = this.dispatchAction.bind(this);
  }

  componentWillMount() {
    const tab = this.props.type === 'login' ? 'login' : 'signup';
    this.setState({ selectedTab: tab });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedTab: nextProps.type });
  }

  dispatchAction(values) {
    const { username, password, email } = values;
    if (this.state.selectedTab === 'login') {
      this.props.fetchLogin(username, password);
    }
    if (this.state.selectedTab === 'signup') {
      this.props.createUser(username, email, password);
    }
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="form-toggle-container">
          <div
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            onFocus={() => {}}
            styleName="toggle-tab"
            role="button"
            tabIndex="0"
          >
            <Link to="/login" href="/login" >
              <span styleName="tab-span">
                LOGIN
              </span>
            </Link>
          </div>
          <div
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            onFocus={() => {}}
            styleName="toggle-tab"
            role="button"
            tabIndex="0"
          >
            <Link to="/signup" href="/signup" >
              <span styleName="tab-span">
                  SIGN UP
              </span>
            </Link>
          </div>
          <div styleName={`${this.state.selectedTab}-active active-bg`} />
        </div>
        <AuthForm formType={this.state.selectedTab} formActionDispatch={this.dispatchAction} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchLogin,
  createUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(cssModules(
  AuthFormWrapper,
  styles,
  { allowMultiple: true },
));
