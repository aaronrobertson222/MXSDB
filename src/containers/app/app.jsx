import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Navbar from 'components/navbar';
import LoginForm from 'containers/login-form';

import history from '../../history';


const App = () => (
  <ConnectedRouter history={history}>
    <div>
      <Navbar />
      <LoginForm />
    </div>
  </ConnectedRouter>
);

export default App;
