const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  watch: true,     // webpack 会持续的监听文件的变化
  devServer: {
    hot: true, // 主要 HMR
    open: true
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [new HTMLWebpackPlugin()]
}
