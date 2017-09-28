const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = webpackMerge(commonConfig.METADATA, { ENV: ENV });

module.exports = function (options) {
  return webpackMerge(commonConfig.define(Object.assign({
    isProd: true,
    isProdBuild: true
  }, options)), {
    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'APP_VERSION': JSON.stringify(METADATA.APP_VERSION)
        }
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        }
      })
    ]
  });
};
