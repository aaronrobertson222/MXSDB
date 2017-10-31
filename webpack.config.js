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

const autoprefixer = require('autoprefixer');

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
    test: /\.(png|gif|jpg|svg)$/,
    use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
  },
];

if (isProduction) {
  clientPlugins.push(new webpack.optimize.UglifyJsPlugin({
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
  }));

  serverPlugins.push(new webpack.optimize.UglifyJsPlugin({
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
  }));
} else {
  clientPlugins.push(new webpack.HotModuleReplacementPlugin());
  serverPlugins.push(new webpack.HotModuleReplacementPlugin());
}

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
  },
  {
    name: 'server',
    target: 'node',
    entry: path.join(__dirname, 'server.js'),
    plugins: serverPlugins,
    module: {
      rules: serverRules,
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
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    devtool: isProduction ? false : 'source-map',
  },
];
