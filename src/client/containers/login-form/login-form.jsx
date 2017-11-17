import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { fetchLogin } from 'actions/index.actions';

import styles from './login-form.css';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currentForm: 'login',
    };
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
  }

  toggleFormType() {
    if (this.state.currentForm === 'login') {
      this.setState({ currentForm: 'signup' });
    } else {
      this.setState({ currentForm: 'login' });
    }
  }

  formSubmitHandler(values) {
    if (this.state.currentForm === 'login') {
      const { username, password } = values;
      this.props.fetchLogin(username, password);
    }
  }

  render() {
    let form;
    if (this.state.currentForm === 'login') {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <div styleName="field">
            <label htmlFor="username" styleName="label">
              Username
              <Field name="username" component="input" type="text" styleName="input" />
            </label>
          </div>
          <div styleName="field">
            <label htmlFor="password" styleName="label">
              Password
              <Field name="password" component="input" type="text" styleName="input" />
            </label>
          </div>
          <button styleName="submit-button" type="submit">Login</button>
        </form>
      );
    } else {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <div styleName="field">
            <label htmlFor="username" styleName="label">
              Username
              <Field name="username" component="input" type="text" styleName="input" />
            </label>
          </div>
          <div styleName="field">
            <label htmlFor="email" styleName="label">
              Email
              <Field name="email" component="input" type="text" styleName="input" />
            </label>
          </div>
          <div styleName="field">
            <label htmlFor="password" styleName="label">
              Password
              <Field name="password" component="input" type="text" styleName="input" />
            </label>
          </div>
          <div styleName="field">
            <label htmlFor="password" styleName="label">
              Re-enter Password
              <Field name="password" component="input" type="text" styleName="input" />
            </label>
          </div>
          <button styleName="submit-button" type="submit">Sign Up</button>
        </form>
      );
    }
    return (
      <div styleName="wrapper">
        <div styleName={`form-toggle-container ${this.state.currentForm}`}>
          <div
            onClick={this.toggleFormType}
            onKeyPress={this.toggleFormType}
            onFocus={() => {}}
            styleName="login-toggle toggle-tab"
            role="button"
            tabIndex="0"
          >
            <span>
              Login
            </span>
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
              Sign Up
            </span>
          </div>
        </div>
        {form}
      </div>
    );
  }
}

LoginForm.propTypes = {
  fetchLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(null, { fetchLogin })(reduxForm({
  form: 'UserLogin',
})(cssModules(LoginForm, styles, { allowMultiple: true })));
