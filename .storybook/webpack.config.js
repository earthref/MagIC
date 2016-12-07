const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../')
      },
      {
        test:   /\.css$/,
        loaders: ["style", "css", "postcss"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../')
      },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]',
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../')
      }
    ]
  }
};