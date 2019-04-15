const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  routers
} = require('./routers.dev.json');

const entry = {};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
const plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: [r.name],
}));

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '..', 'src/'),
  entry,
  devServer: {
    port: 8060,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['public']),
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
        }, // creates style nodes from JS strings
        {
          loader: 'css-loader'
        }, // translates CSS into CommonJS
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        },
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }, ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
