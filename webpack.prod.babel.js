import path from 'path';

export default {
  entry: './src/js/jquery.flipper.js',
  output: {
    filename: 'jquery.flipper.min.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  externals: {
    'jquery': 'jQuery'
  }
};