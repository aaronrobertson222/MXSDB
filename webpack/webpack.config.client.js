const webpack = require('webpack');
const path = require('path');

// Paths
const rootPath = process.cwd();
const srcPath = path.join(rootPath, 'src');
const clientPath = path.join(srcPath, 'client');
const universal = path.join(srcPath, 'universal');
const clientInclude = [clientPath, universal];
const buildPath = path.join(rootPath, 'build');
const httpServicePath = `${universal}/redux/services/http.js`;
const envConfigPath = `${universal}/config/environments/production.js`;

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
    '__CLIENT__': true,
    '__PRODUCTION__': true,
  }),
  new AssetsPlugin({path: buildPath, filename: 'assets.json'}),
  new webpack.optimize.MinChunkSizePlugin({minChunkSize: 50000}),
  new ExtractTextPlugin({
    filename: '[name]-[hash].css',
    allChunks: true,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
];

// Rules
const rules = [
  // JS|JSX
  {
    test: /\.(js|jsx)$/,
    include: clientInclude,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  // CSS
  {
    test: /\.(css|scss)$/,
    include: clientInclude,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            root: srcPath,
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [path.join(universal, 'assets', 'styles')],
          }
        },
      ]})
  },
  // Images
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=1000&name=assets/[name]-[hash].[ext]'],
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
  },
  {
    test: /\.json($|\?)/,
    use: 'json-loader',
  },
];

const vendor = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'redux'
];

// Config
module.exports = {
  devtool: 'source-map',
  context: srcPath,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      './client/index.jsx',
    ],
    vendor,
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: buildPath,
    publicPath: '/static/'
  },
  node: {
    dns: 'mock',
    net: 'mock',
  },
  plugins,
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      srcPath,
      'node_modules',
    ],
    alias: {
      envConfig: envConfigPath,
      actions: path.join(universal, 'actions'),
      containers: path.join(universal, 'containers'),
      components: path.join(universal, 'components'),
      httpService: httpServicePath,
      images: path.join(universal, 'assets', 'images'),
      layouts: path.join(universal, 'layouts'),
      reducers: path.join(universal, 'reducers'),
    }
  }
};
