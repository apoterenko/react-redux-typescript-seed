const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.METADATA, { ENV: ENV });

module.exports = function () {
  return webpackMerge(commonConfig.define({ isProd: false }), {
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /<meta http-equiv="Content-Security-Policy".+\/>/g,
                replacement: function () {
                  return '';
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'APP_VERSION': JSON.stringify(METADATA.APP_VERSION)
        }
      })
    ]
  });
};
