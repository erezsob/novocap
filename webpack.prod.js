const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, './node_modules/react-vis'),
          path.resolve(__dirname, './node_modules/react-table'),
          path.resolve(__dirname, './src/components/table/datagrid')
        ],
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                minimize: true,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './node_modules/react-vis'),
          path.resolve(__dirname, './node_modules/react-table'),
          path.resolve(__dirname, './src/components/table/datagrid')
        ],
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin('[name]_[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new UglifyJsPlugin({
      parallel: 4,
      sourceMap: true,
      exclude: [/\.min\.js$/gi]
    })
  ]
});
