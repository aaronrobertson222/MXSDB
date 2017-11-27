import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import FieldWrapper from 'components/field-wrapper/field-wrapper';

import { fetchLogin, createUser } from 'actions/index.actions';

import styles from './auth-form.scss';

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
        icon: 'user-o',
        type: 'text',
      },
      {
        fieldName: 'password',
        icon: 'lock',
        type: 'password',
      },
    ];

    if (this.props.formType === 'signup') {
      fieldData.push(
        {
          fieldName: 'confirm-password',
          icon: 'lock',
          type: 'password',
          placeholder: 'confirm password',
        },
        {
          fieldName: 'email',
          type: 'text',
          icon: 'envelope-o',
          placeholder: 'Enter your email',
        },
      );
    }

    return (
      <form onSubmit={this.props.handleSubmit(this.formSubmitHandler)} styleName="form-wrapper">
        {fieldData.map(field => (
          <FieldWrapper label={field.icon} labelFor={field.fieldName} key={field.fieldName}>
            <Field
              name={field.fieldName}
              component="input"
              type={field.type}
              styleName="input"
              placeholder={field.fieldName}
            />
          </FieldWrapper>
        ))}
        <button styleName="submit-button" type="submit">{this.props.formType}</button>
      </form>
    );
  }
}

export default connect(null, { fetchLogin, createUser })(reduxForm({
  form: 'AuthForm',
})(cssModules(AuthForm, styles, { allowMultiple: true })));
