const path = require('path')

module.exports = {
  entry: './src/index',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  // 设置 tree shaking
  mode: 'production', // 如果是 development 可以看到 会有没有用到的代码
  optimization: {
    usedExports: true,
  }
}
