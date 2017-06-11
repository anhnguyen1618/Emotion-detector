const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge').smart;

const PATHS = require('./paths.js')
const common = require('./common.config.js')

module.exports = merge({
  devtool: 'inline-source-maps',

  devServer: {
    contentBase: PATHS.build,
    port: 8080,
    inline: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: {
      index: 'index.html'
    },
    watchOptions: { poll: 1000, ignored: /node_modules/ },
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': 'http://localhost:8000/api'
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, common)
