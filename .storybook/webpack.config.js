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
        test: /.less$/,
        loaders: ["style", "css", "less"],
        include: path.resolve(__dirname, '../')
      },
      {
        test:   /\.css$/,
        loaders: ["style", "css", "postcss"],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
};