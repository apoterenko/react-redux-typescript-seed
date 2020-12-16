const helpers = require('./helpers');

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const APP_VERSION = process.env.npm_package_version || '0.0.0';
const METADATA = { host: HOST, port: PORT, APP_VERSION: APP_VERSION };

const miniCssExtractPlugin = new MiniCssExtractPlugin({filename: '[name].css?' + APP_VERSION});

module.exports.METADATA = METADATA;
module.exports.define = function (options) {
  return {
    output: {
      path: helpers.root('dist'),
      filename: '[name].js?' + APP_VERSION,
      sourceMapFilename: '[file].map'
    },
    entry: {
      app: './src/ts/app/app.bootstrap.tsx',
      polyfills: './src/ts/app/polyfills.ts'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.ts|\.tsx$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.json',
                useCache: false
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('node_modules')]
            }
          }],
        },
        {
          test: /\.js$/,
          include: [helpers.root('node_modules/@material')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'raw-loader',
            options: {
              useCache: false
            }
          },
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.html$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\{VERSION\}/g,
                replacement: function () { return APP_VERSION; }
              }
            ].concat(
                !options.isProdBuild
                    ? {
                      pattern: /<meta http-equiv="Content-Security-Policy".+\/>/g,
                      replacement: function () {
                        return '';
                      }
                    }
                    : []
            )
          })
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      miniCssExtractPlugin,
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/app.html',
        inject: 'body'
      }),
      new LoaderOptionsPlugin({
        minimize: options.isProd,
        debug: !options.isProd,
        options: {
          sassLoader: {
            includePaths: [
              helpers.root('node_modules/@material')
            ]
          }
        }
      }),
      new StringReplacePlugin()
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      watchOptions: {
        ignored: /node_modules/
      },
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8443/api',
          secure: false
        }
      }
    }
  };
};
