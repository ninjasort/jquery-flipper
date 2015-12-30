import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/js/jquery-flipper.js',
  output: {
    filename: 'jquery-flipper.min.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'imports?this=>window!babel' }
    ]
  },
  resolve: {
    root: ['src'],
    extensions: ['', '.js']
  },
  externals: {
    'jquery': 'jQuery'
  }
};