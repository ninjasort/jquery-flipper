import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/js/jquery-flipper.js',
  output: {
    filename: 'jquery-flipper.js',
    publicPath: '/assets/',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'imports?this=>window!babel' }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, './src'),
    extensions: ['', '.js']
  },
  externals: {
    'jquery': 'jQuery'
  }
};