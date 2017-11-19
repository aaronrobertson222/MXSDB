import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import FieldWrapper from 'components/field-wrapper';

import { fetchLogin } from 'actions/index.actions';

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
  }

  render() {
    let form;
    if (this.props.formType === 'login') {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <FieldWrapper label="Username" labelFor="password">
            <Field name="username" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <FieldWrapper label="Password" labelFor="password">
            <Field name="password" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <button styleName="submit-button" type="submit">Login</button>
        </form>
      );
    } else {
      form = (
        <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
          <FieldWrapper label="Username" labelFor="password">
            <Field name="username" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <FieldWrapper label="Email" labelFor="email">
            <Field name="email" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <FieldWrapper label="Password" labelFor="password">
            <Field name="password" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <FieldWrapper label="Re-enter Password" labelFor="password">
            <Field name="password" component="input" type="text" styleName="input" />
          </FieldWrapper>
          <button styleName="submit-button" type="submit">Sign Up</button>
        </form>
      );
    }
    return form;
  }
}

export default connect(null, { fetchLogin })(reduxForm({
  form: 'AuthForm',
})(cssModules(AuthForm, styles, { allowMultiple: true })));
