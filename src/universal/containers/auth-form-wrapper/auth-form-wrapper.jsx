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
    route: PropTypes.object.isRequired,
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
    const tab = this.props.route.type;
    this.setState({ selectedTab: tab });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedTab: nextProps.route.type });
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
            <Link to="/auth/login" href="/auth/login" >
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
            <Link to="/auth/signup" href="/auth/signup" >
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
