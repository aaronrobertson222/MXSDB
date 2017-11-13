import React from 'react';
import cssModules from 'react-css-modules';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import styles from './email-input.css';

const EmailInput = props => (
  <div styleName="container">
    <label htmlFor="email" styleName="label">
      {props.label}
      <Field name="email" component="input" type="text" styleName="input" />
    </label>
  </div>
);

EmailInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default cssModules(EmailInput, styles);
