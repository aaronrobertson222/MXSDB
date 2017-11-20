import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import FieldWrapper from 'components/field-wrapper';

import { fetchLogin, createUser } from 'actions/index.actions';

import styles from './auth-form.css';

class AuthForm extends React.Component {
  static propTypes = {
    fetchLogin: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      formType: this.props.formType,
    };

    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(values) {
    if (this.state.formType === 'login') {
      const { username, password } = values;
      this.props.fetchLogin(username, password);
    }
    if (this.state.formType === 'signup') {
      const { username, password, email } = values;
      this.props.createUser(username, email, password); //eslint-disable-line
    }
  }

  render() {
    let form;
    if (this.props.formType === 'login') {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <FieldWrapper label="Username" labelFor="password">
            <Field name="username" component="input" type="text" styleName="input" placeholder="Enter your username" />
          </FieldWrapper>
          <FieldWrapper label="Password" labelFor="password">
            <Field name="password" component="input" type="password" styleName="input" placeholder="Password" />
          </FieldWrapper>
          <button styleName="submit-button" type="submit">Login</button>
        </form>
      );
    } else {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <FieldWrapper label="Username" labelFor="password">
            <Field name="username" component="input" type="text" styleName="input" placeholder="Enter desired username" />
          </FieldWrapper>
          <FieldWrapper label="E-mail" labelFor="email">
            <Field name="email" component="input" type="text" styleName="input" placeholder="Enter your e-mail address" />
          </FieldWrapper>
          <FieldWrapper label="Password" labelFor="password">
            <Field name="password" component="input" type="text" styleName="input" placeholder="Password" />
          </FieldWrapper>
          <FieldWrapper label="Re-enter Password" labelFor="password">
            <Field name="password" component="input" type="text" styleName="input" placeholder="Re-enter Password" />
          </FieldWrapper>
          <button styleName="submit-button" type="submit">Sign Up</button>
        </form>
      );
    }
    return form;
  }
}

export default connect(null, { fetchLogin, createUser })(reduxForm({
  form: 'AuthForm',
})(cssModules(AuthForm, styles, { allowMultiple: true })));
