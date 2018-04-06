const webpack = require('webpack');
const path = require('path');

// Paths
const rootPath = process.cwd();
const srcPath = path.join(rootPath, './src');
const clientPath = path.join(srcPath, './client');
const universal = path.join(srcPath, './universal');
const clientInclude = [clientPath, universal];
// Paths for fetch and envConfig aliases
const httpServicePath = `${universal}/redux/services/http.js`;
const envConfigPath = `${universal}/config/environments/${process.env.NODE_ENV}.js`;

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: rootPath,
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    '__CLIENT__': true,
    '__PRODUCTION__': false,
  }),
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
    include: clientInclude,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.(css|scss)$/,
    include: clientInclude,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          root: srcPath,
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(universal, 'assets', 'styles')],
          sourceMap: true,
        }
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
  },
  {
    test: /\.json($|\?)/,
    use: 'json-loader',
  },
];

module.exports = {
  context: srcPath,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './client/index.jsx',
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(rootPath, 'build'),
    publicPath: '/static/'
  },
  plugins,
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      srcPath,
      'node_modules',
    ],
    alias: {
      actions: path.join(universal, 'actions'),
      components: path.join(universal, 'components'),
      containers: path.join(universal, 'containers'),
      envConfig: envConfigPath,
      httpService: httpServicePath,
      images: path.join(universal, 'assets', 'images'),
      layouts: path.join(universal, 'layouts'),
      reducers: path.join(universal, 'reducers'),
    },
  },
  devtool: 'source-map',
};
