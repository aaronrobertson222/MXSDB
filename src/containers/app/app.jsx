import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Navbar from 'components/navbar/navbar';

import history from '../../history';


const App = () => (
  <ConnectedRouter history={history}>
    <Navbar />
  </ConnectedRouter>
);

export default App;
