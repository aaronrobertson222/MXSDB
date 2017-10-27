const webpack = require('webpack');

const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv !== 'development';
const testing = nodeEnv === 'testing' || false;

const buildPath = path.join(__dirname, './build/');
const srcPath = path.join(__dirname, './src/');
const httpServicePath = `${__dirname}/src/redux/services/http.js`;

const envConfigFile = testing ? 'development' : process.env.NODE_ENV || 'default';
const envConfigPath = `${__dirname}/src/config/environments/${envConfigFile}.js`;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
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
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: srcPath,
    },
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
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
];

if (isProduction) {
  plugins.push(
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
    new ExtractTextPlugin('style-[hash].css'),
  );

  rules.push({
    test: /\.css$/,
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  });
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  rules.push({
    test: /\.css$/,
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  });
}

module.exports = {
  entry: path.join(srcPath, 'index.jsx'),
  context: srcPath,
  plugins,
  module: {
    rules,
  },
  resolve: {
    alias: {
      envConfig: envConfigPath,
      components: path.join(srcPath, 'components'),
      containers: path.join(srcPath, 'containers'),
      actions: path.join(srcPath, 'actions'),
      reducers: path.join(srcPath, 'reducers'),
      httpService: httpServicePath,
      images: path.join(srcPath, 'assets', 'images'),
      'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
    },
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcPath,
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: isProduction ? false : 'source-map',
};
