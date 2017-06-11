const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack-loader');
const PATHS = require('./paths.js')

module.exports = {
  module: {
    loaders: loaders
  },
  entry: [
    'react-hot-loader/patch',
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
