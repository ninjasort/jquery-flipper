import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// postcss
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  entry: './src/js/jquery.flipper.js',
  output: {
    filename: 'jquery.flipper.js',
    publicPath: '/assets/',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'imports?this=>window!babel' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss?pack=dev!sass') }
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss?pack=prod!sass') }
    ]
  },
  postcss: function () {
    return {
      dev: [autoprefixer],
      prod: [cssnano, autoprefixer]
    }
  },
  plugins: [
    new ExtractTextPlugin('jquery.flipper.css')
  ],
  resolve: {
    root: ['src'],
    extensions: ['', '.js', '.scss']
  },
  externals: {
    'jquery': 'jQuery'
  }
};