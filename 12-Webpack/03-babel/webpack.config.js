const path = require('path')

module.exports = {
  entry: './src/index.js', // 入口文件
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    // 处理器
    rules: [{
      // test是一个过滤条件，满足test要求的才用rules处理
      test: /\.js$/,
      // 用什么样的loader去处理满足test的文件序列
      use: [{
        loader: 'babel-loader',      // 用babel-loader去处理js结尾的文件
        options: {
          presets: [
              ['@babel/preset-env']
          ]
        }
      }]
    }]
  }
}
