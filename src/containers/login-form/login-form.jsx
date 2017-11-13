import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchLogin } from 'actions/index.actions';

import EmailInput from 'components/form-inputs/email-input';
import PasswordInput from 'components/form-inputs/password-input';

import styles from './login-form.css';

class LoginForm extends React.Component {
  componentDidMount() {
    console.log('this needs to be removed');
  }
  render() {
    return (
      <form>
        <EmailInput label="Emajhg" />
        <PasswordInput label="Padfasfssword" />
      </form>
    );
  }
}


export default connect(null, { fetchLogin })(reduxForm({
  form: 'UserLogin',
})(cssModules(LoginForm, styles, { allowMultiple: true })));
