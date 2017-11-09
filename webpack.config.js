const webpack = require('webpack');
const path = require('path');

// ENV Variables
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv !== 'development';
const testing = nodeEnv === 'testing' || false;

// Paths
const buildPath = path.join(__dirname, './build/');
const srcPath = path.join(__dirname, './src/');
const httpServicePath = `${__dirname}/src/redux/services/http.js`;
const envConfigFile = testing ? 'development' : process.env.NODE_ENV || 'default';
const envConfigPath = `${__dirname}/src/config/environments/${envConfigFile}.js`;

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PRODUCTION PLUGINS/RULES
const clientPlugins = [
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

const clientRules = [
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
          sourcMap: !isProduction,
        },
      },
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
];

// SERVER PLUGINS/RULES
const serverPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
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

const serverRules = [
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
        loader: 'isomorphic-style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: !isProduction,
        },
      },
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
];

if (isProduction) {
  clientPlugins.push(
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
    new ExtractTextPlugin('style-[hash].css')
  );

  serverPlugins.push(
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
    new ExtractTextPlugin('style-[hash].css')
  );
} else {
  clientPlugins.push(new webpack.HotModuleReplacementPlugin());
  serverPlugins.push(new webpack.HotModuleReplacementPlugin());
}

const alias = {
  actions: path.join(__dirname, 'src', 'actions'),
  containers: path.join(__dirname, 'src', 'containers'),
  components: path.join(__dirname, 'src', 'components'),
  envConfig: envConfigPath,
  httpService: httpServicePath,
  images: path.join(__dirname, 'src', 'assets', 'images'),
  reducers: path.join(__dirname, 'src', 'reducers'),
};

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: path.join(srcPath, 'index.jsx'),
    context: srcPath,
    plugins: clientPlugins,
    module: {
      rules: clientRules,
    },
    resolve: {
      alias,
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
  },
  {
    name: 'server',
    target: 'node',
    entry: path.join(__dirname, 'server.jsx'),
    plugins: serverPlugins,
    module: {
      rules: serverRules,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        srcPath,
      ],
    },
    output: {
      path: buildPath,
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    devtool: isProduction ? false : 'source-map',
  },
];
