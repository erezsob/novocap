const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, './node_modules/react-vis'),
          path.resolve(__dirname, './node_modules/react-table'),
          path.resolve(__dirname, './src/components/table/datagrid')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path]-[name]__[local]___[hash:base64:5]',
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './node_modules/react-vis'),
          path.resolve(__dirname, './node_modules/react-table'),
          path.resolve(__dirname, './src/components/table/datagrid')
        ],
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
});
