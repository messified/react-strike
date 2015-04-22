var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 
    'webpack/hot/dev-server', 
    path.resolve(appPath, 'app.js')],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
    { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
    { test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath]},
    { test: /\.css$/, loader: 'style!css'}]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
