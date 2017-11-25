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
    createUser: PropTypes.func.isRequired,
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
      this.props.createUser(username, email, password);
    }
  }

  render() {
    const fieldData = [
      {
        fieldName: 'username',
        type: 'text',
        component: 'input',
        placeholder: 'Enter your username',
        style: 'input',
        id: 0,
      },
      {
        fieldName: 'password',
        type: 'password',
        component: 'input',
        placeholder: 'Password',
        style: 'input',
        id: 1,
      },
    ];

    if (this.props.formType === 'signup') {
      fieldData.push(
        {
          fieldName: 'confirm-password',
          type: 'password',
          component: 'input',
          placeholder: 'confirm password',
          style: 'input',
          id: 2,
        },
        {
          fieldName: 'email',
          type: 'text',
          component: 'input',
          placeholder: 'Enter your email',
          style: 'input',
          id: 3,
        },
      );
    }
    const formFields = fieldData.map(field => (
      <FieldWrapper label={field.fieldName} labelFor={field.fieldName} key={field.id}>
        <Field
          name={field.fieldName}
          component={field.component}
          type={field.type}
          styleName={field.style}
          placeholder={field.placeholder}
        />
      </FieldWrapper>
    ));

    return (
      <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
        {formFields}
        <button styleName="submit-button" type="submit">{this.props.formType}</button>
      </form>
    );
  }
}

export default connect(null, { fetchLogin, createUser })(reduxForm({
  form: 'AuthForm',
})(cssModules(AuthForm, styles, { allowMultiple: true })));
