const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Paths
const rootPath = process.cwd();
const srcPath = path.join(rootPath, './src');
const serverPath = path.join(srcPath, './server');
const universal = path.join(srcPath, './universal');
const buildPath = path.join(rootPath, './build');
const serverInclude = [serverPath, universal];
// paths for fetch and envConfig aliases
const httpServicePath = `${universal}/redux/services/http.js`;
const envConfigPath = `${universal}/config/environments/production.js`;

// Plugins
const plugins = [
  new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
    '__CLIENT__': false,
    '__PRODUCTION__': true,
  }),
  new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
  new ExtractTextPlugin('style-[hash].css'),
  new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
  new webpack.NoEmitOnErrorsPlugin(),
];

// RULES
const rules = [
  // JS|JSX
  {
    test: /\.(js|jsx)$/,
    include: serverInclude,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  // CSS
  {
    test: /\.(css|scss)$/,
    include: serverInclude,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            sourceMap: true,
            context: srcPath,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
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

module.exports = {
  devtool: 'source-map',
  context: srcPath,
  entry: {
    prerender: './universal/routes/routes.js',
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
