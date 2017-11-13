import React from 'react';
import cssModules from 'react-css-modules';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import styles from './password-input.css';

const PasswordInput = props => (
  <div styleName="container">
    <label htmlFor="password" styleName="label">
      {props.label}
      <Field name="password" component="input" type="text" styleName="input" />
    </label>
  </div>
);

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default cssModules(PasswordInput, styles);
