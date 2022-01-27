const path = require('path')

module.exports = {
  entry: './src/index.js', // 入口文件
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  }
}


