import React from 'react';
import cssModules from 'react-css-modules';

import styles from './footer.scss';

const Footer = () => (
  <div styleName="container">
    <div styleName="row">
      <div styleName="copyright">
        Copyright &#169; 2018 MXSDB. All Rights Reserved.
      </div>
      <div styleName="links">
        <ul>
          <li>
            <a href="/browse">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="http://www.mxsimulator.com/" target="_blank" rel="noopener noreferrer">
              MX Simulator
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default cssModules(Footer, styles);
