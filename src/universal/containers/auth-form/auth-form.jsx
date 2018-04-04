import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import FieldWrapper from 'components/field-wrapper/field-wrapper';
import styles from './auth-form.scss';

const AuthForm = (props) => {
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

  if (props.formType === 'signup') {
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

  const {
    handleSubmit,
    pristine,
    submitting,
    formType,
  } = props;

  return (
    <form onSubmit={handleSubmit(props.formActionDispatch)} styleName="form-wrapper">
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
      <button className="submit" styleName="submit-button" disabled={pristine || submitting} type="submit">{formType}</button>
    </form>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  formType: PropTypes.string.isRequired,
  formActionDispatch: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'AuthForm',
})(cssModules(AuthForm, styles, { allowMultiple: true }));
