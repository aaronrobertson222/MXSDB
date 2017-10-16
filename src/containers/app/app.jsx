import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'components/navbar/navbar';

const App = () => (
  <Router>
    <Navbar />
  </Router>
);

export default connect()(App);
