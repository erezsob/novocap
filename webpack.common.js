const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: './index.js'
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './reports-index.html',
      openAnalyzer: false
    }),
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: './index.html'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|de|fr/)
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000&mimetype=image/svg+xml',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[name]_[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.', '.js', '.jsx', '.css']
  }
};
