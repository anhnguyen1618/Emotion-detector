const webpack = require('webpack');
const merge = require('webpack-merge').smart;

const common = require('./common.config.js')

module.exports = merge({
  entry: {
    vendor: ['react'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      )
    }),
  ],
}, common)
