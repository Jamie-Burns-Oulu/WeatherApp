const path = require('path');

module.exports = {
  entry: ['@babel/polyfill','./src/main.js'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www/js')
  },
  watch: true,
  module: {
     rules:[
        {
           test: /\.css$/,
           use: ['style-loader', 'css-loader']
        },
        {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
              loader: "babel-loader"
           }
        },
        {
         test: /\.(png|jpg)$/,
         loader: 'url-loader'
       }
     ]
  }
};