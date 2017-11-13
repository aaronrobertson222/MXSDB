const webpack = require('webpack');
const path = require('path');

// Paths
const rootPath = process.cwd();
const srcPath = path.join(rootPath, './src/');
const clientPath = path.join(srcPath, './client/');
const httpServicePath = `${__dirname}/src/redux/services/http.js`;
const envConfigFile = 'development';
const envConfigPath = `${__dirname}/src/config/environments/${envConfigFile}.js`;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks(module) {
      const { context } = module.context;
      return context && context.indexOf('node_modules') >= 0;
    },
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: rootPath,
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const rules = [
  {
    test: /\.html$/,
    use: [
      'html-loader',
    ],
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.css$/,
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
          sourcMap: true,
        },
      },
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
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
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?noInfo=false',
    './client/index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(rootPath, 'build'),
    publicPath: '/static/'
  },
  plugins,
  module: {
    rules,
  },
  resolve: {
    alias: {
      actions: path.join(clientPath, 'actions'),
      containers: path.join(clientPath, 'containers'),
      components: path.join(clientPath, 'components'),
      envConfig: envConfigPath,
      httpService: httpServicePath,
      images: path.join(clientPath, 'assets', 'images'),
      reducers: path.join(clientPath, 'reducers'),
    },
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.resolve(rootPath, 'node_modules'),
      srcPath,
    ],
  },
  devtool: 'source-map',
};
