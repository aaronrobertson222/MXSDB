import React from 'react';
import PropTypes from 'prop-types';
import {StaticRouter} from 'react-router';
import {renderToString} from 'react-dom/server';
import {renderRoutes} from 'react-router-config';
import { Provider } from 'react-redux';

// App routes
import routes from '../universal/routes/routes';

class Html extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    assets: PropTypes.object
  }

  render() {
    const PROD = process.env.NODE_ENV === 'production';

    const {
      title,
      store,
      assets,
      url,
      context,
    } = this.props;

    const {
      manifest,
      app,
      vendor
    } = assets || {};

    let state = store.getState();

    const initialState = `window.__PRELOADED_STATE__ = ${JSON.stringify(state)}`;

    const root = PROD && renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    return (
      <html>
        <head>
          <title>{title}</title>
          {PROD && <link rel="stylesheet" href={app.css} type="text/css" />}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: initialState}} />
          {PROD ? <div id="app" dangerouslySetInnerHTML={{__html: root}}></div> : <div id="app"></div>}
          {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}}/>}
          {PROD && <script src={vendor.js}></script>}
          <script src={PROD ? app.js : '/static/app.js'}></script>
        </body>
      </html>
    );
  }
}

export default Html;
