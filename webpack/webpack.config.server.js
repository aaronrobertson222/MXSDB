const webpack = require('webpack');
const path = require('path');

// Paths
const rootPath = process.cwd();
const srcPath = path.join(rootPath, './src');
const clientPath = path.join(srcPath, './client');
const buildPath = path.join(rootPath, './build');
const httpServicePath = `${clientPath}/redux/services/http.js`;
const envConfigPath = `${clientPath}/config/environments/production.js`;

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
  new ExtractTextPlugin('style-[hash].css'),
  new webpack.NoEmitOnErrorsPlugin(),
];

// RULES
const rules = [
  // JS|JSX
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  // CSS
  {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(clientPath, 'assets', 'styles')],
          sourceMap: true,
        }
      },
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
  // Images
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
  // SVG
  {
    test: /\.svg$/,
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        loader: 'react-svg-loader',
        query: {
          jsx: true,
          svgo: {
            plugins: [{removeTitle: false}, {removeXMLNS: true}],
            floatPrecision: 2
          }
        }
      }
    ]
  }
];

module.exports = {
  context: srcPath,
  entry: {
    prerender: '../src/client/routes/routes.jsx',
  },
  target: 'node',
  output: {
    path: buildPath,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  plugins,
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.resolve(rootPath, 'node_modules'),
      srcPath
    ],
    alias: {
      envConfig: envConfigPath,
      actions: path.join(clientPath, 'actions'),
      containers: path.join(clientPath, 'containers'),
      components: path.join(clientPath, 'components'),
      httpService: httpServicePath,
      images: path.join(clientPath, 'assets', 'images'),
      layouts: path.join(clientPath, 'layouts'),
      reducers: path.join(clientPath, 'reducers'),
    }
  }
};
