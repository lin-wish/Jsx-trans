const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env == "development"

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    index: 'index.html'
  },
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
    // Force HTMLtoJSX to use the in-browser `document` object rather than
    // require the Node-only "jsdom" package.
        IN_BROWSER: true,
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader', options: {
            strictMath: true,
            noIeCompat: true
          }
        }]
      },

      { test: /\.json$/, loader: 'json-loader' },

    ]
  }
};
